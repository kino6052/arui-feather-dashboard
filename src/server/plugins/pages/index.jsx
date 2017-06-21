/* eslint no-console: ["error", { allow: ["log", "error"] }] */
/* eslint consistent-return: "off" */
import { renderToString } from 'react-dom/server';
import Boom from 'boom';
import { RouterContext, createMemoryHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import config from 'config';
import configureStore from '../../../configure-store';
import routes from '../../../routes';

const template = require('./index.html.ejs');

const defaultState = {
    app: {
        error: false
    },
    settings: config.get('client')
};

export const register = (server, options, next) => {
    let handler = async (request, reply) => {
        const contextRoot = config.get('client.contextRoot');
        const path = request.url.path;
        const memoryHistory = createMemoryHistory(path);
        const store = configureStore(false)(defaultState, memoryHistory);
        const history = syncHistoryWithStore(memoryHistory, store);
        match({ history, routes, location: path, basename: contextRoot }, (error, redirectLocation, renderProps) => {
            if (error) {
                console.error(error);
                return reply(Boom.badImplementation());
            }

            if (redirectLocation) {
                return reply().redirect(contextRoot + redirectLocation.pathname + redirectLocation.search);
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
                        assetsHash: options.assetsHash,
                        content: renderToString(appCode),
                        state: JSON.stringify(store.getState()),
                        rootPath: `${contextRoot}/`
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
