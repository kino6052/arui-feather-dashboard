import ReactDOMServer from 'react-dom/server';
import { render } from '../../../index.jsx';
let template = require('./index.html.ejs');

function getState(request) {
    return {
        screen: 'screen1'
    };
}

export let register = function (server, options, next) {
    let handler = async function (request, reply) {
        try {
            let state = await getState(request);
            reply(template({
                staticAssets: options.staticAssets,
                content: ReactDOMServer.renderToString(render(state)),
                state: JSON.stringify(state)
            }));
        } catch (error) {
            console.error(error, error.stack);
            reply(error);
        }
    };

    server.route({ method: 'GET', path: '/', handler });
    next();
};

register.attributes = {
    name: 'pages/index'
};

export default register;
