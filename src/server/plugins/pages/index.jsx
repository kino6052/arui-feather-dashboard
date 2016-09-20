/* eslint no-console: ["error", { allow: ["log", "error"] }] */
/* eslint consistent-return: "off" */
import Boom from 'boom';
import { RouterContext, createMemoryHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import config from 'config';
import configureStore from '../../../configureStore';
import routes from '../../../routes';

import { renderToString } from 'react-dom/server';
const template = require('./index.html.ejs');
const defaultState = {
    app: {
        settings: config.get('client'),
        error: false
    }
};

export let register = function (server, options, next) {
    let handler = async function (request, reply) {
        const path = request.url.path;
        const memoryHistory = createMemoryHistory(path);
        const store = configureStore(false)(defaultState);
        const history = syncHistoryWithStore(memoryHistory, store);
        match({ history, routes, location: path }, (error, redirectLocation, renderProps) => {
            if (error) {
                console.error(error);
                return reply(Boom.badImplementation());
            }

            if (redirectLocation) {
                return reply().redirect(redirectLocation.pathname + redirectLocation.search);
            }

            if (renderProps) {
                let page;
                const appCode = (
                    <Provider store={ store }>
                        <RouterContext { ...renderProps } />
                    </Provider>
                );
                try {
                    page = template({
                        staticAssets: options.staticAssets,
                        content: renderToString(appCode),
                        state: JSON.stringify(store.getState())
                    });
                } catch (error) {
                    console.error('error during render process', error);
                    reply(Boom.badImplementation());
                }
                reply(page);
            } else {
                // if you are here,
                // this means routes do not contain default route
                console.error(`No page found for path ${path}`);
                reply(Boom.notFound());
            }
        });
    };

    server.route({ method: 'GET', path: '/{whateverPath?}', handler }); // root route
    server.route({ method: 'GET', path: '/{whateverPath*}', handler }); // hack to support several slashes in path
    next();
};

register.attributes = {
    name: 'pages/index'
};

export default register;
