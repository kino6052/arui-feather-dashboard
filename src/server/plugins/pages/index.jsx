/* eslint no-console: ["error", { allow: ["log", "error"] }] */
import Boom from 'boom';
import { RouterContext, createMemoryHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import configureStore from '../../../configureStore';
import routes from '../../../routes';

import { renderToString } from 'react-dom/server';
const template = require('./index.html.ejs');

import { getState } from './index-state';

export let register = function (server, options, next) {
    let handler = async function (request, reply) {
        const path = request.url.path;
        const state = getState('screen1');
        const memoryHistory = createMemoryHistory(path);
        const store = configureStore()();
        const history = syncHistoryWithStore(memoryHistory, store);
        match({ history, routes, location: path }, (error, redirectLocation, renderProps) => {
            if (error) {
                console.error(error);
                reply(Boom.badImplementation());
            } else if (redirectLocation) {
                reply().redirect(redirectLocation.pathname + redirectLocation.search);
            } else if (renderProps) {
                let page;
                const appCode = (
                    <Provider store={store}>
                        <RouterContext {...renderProps} />
                    </Provider>
                );
                try {
                    page = template({
                        staticAssets: options.staticAssets,
                        content: renderToString(appCode),
                        state: JSON.stringify(state)
                    });
                } catch (error) {
                    console.error('error during render', error);
                    reply(Boom.badImplementation());
                }
                reply(page);
            } else {
                console.error('no such page');
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
