/* eslint no-console: ["error", { allow: ["log", "error"] }] */

import ReactDOMServer from 'react-dom/server';
let template = require('./index.html.ejs');
import { screens } from '../../../screen-const.js';

import { getState } from './index-state';
import configureStore from '../../../configureStore';
import Root from '../../../root';

export let register = function (server, options, next) {
    let routeHandler = async function (request, reply, screen) {
        try {
            let state = getState(screen);
            let store = configureStore(true)(state);

            reply(template({
                staticAssets: options.staticAssets,
                content: ReactDOMServer.renderToString(<Root store={ store } />),
                state: JSON.stringify(state)
            }));
        } catch (error) {
            console.error(error, error.stack);
            reply(error);
        }
    };

    server.route(
        Object.keys(screens).map(function (key) {
            return {
                method: 'GET',
                path: screens[key].path,
                handler: (request, reply) => {
                    routeHandler(request, reply, screens[key].name);
                }
            };
        })
    );
    next();
};

register.attributes = {
    name: 'pages/index'
};

export default register;
