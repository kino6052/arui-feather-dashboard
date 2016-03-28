import ReactDOMServer from 'react-dom/server';
import { render } from '../../../index.jsx';
const TEMPLATE = require('./index.html.ejs');

export let register = function (server, options, next) {
    let handler = async function (request, reply) {
        try {
            let state = await getState(request);
            reply(TEMPLATE({
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

function getState(request) {
    return {
        screen: 'screen1'
    };
}

export default register;
