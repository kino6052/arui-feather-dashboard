/* eslint-disable no-console, arrow-body-style */

import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { RouterContext, createMemoryHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';

import configureStore from './configure-store';
import Root from './root';
import routes from './routes';
import template from './server/plugins/pages/index.html.ejs';

const SERVER_SIDE_RENDER = process.env.SERVER_SIDE_RENDER;
const CLIENT_SIDE_RENDER = process.env.CLIENT_SIDE_RENDER;

// Client side render (optional):
if (typeof window !== 'undefined') {
    // eslint-disable-next-line no-underscore-dangle
    window.__main = (state) => {
        if (CLIENT_SIDE_RENDER) {
            let store = configureStore(false)(state);
            ReactDOM.render(<Root store={ store } />, document.getElementById('react-app'));
        }

        return state;
    };
}

export default (locals, callback) => {
    const path = locals.path;
    const memoryHistory = createMemoryHistory(path);
    const store = configureStore(false)(locals.state, memoryHistory);
    const history = syncHistoryWithStore(memoryHistory, store);

    match({ history, routes, location: path }, (error, redirectLocation, renderProps) => {
        const appCode = (
            <Provider store={ store }>
                <RouterContext { ...renderProps } />
            </Provider>
        );

        if (renderProps) {
            callback(null, template({
                content: SERVER_SIDE_RENDER ? ReactDOMServer.renderToString(appCode) : '',
                state: JSON.stringify(store.getState()),
                staticAssets: true,
                rootPath: locals.path !== '/'
                    ? locals.path.split('/').slice(1).map(() => '../').join('')
                    : '/'
            }));
        } else {
            console.error(`No page found for path ${path}`);
        }
    });
};
