/* eslint no-console: ["error", { allow: ["log", "error"] }] */

import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import Boom from 'boom';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import config from 'config';
import AppHtml from 'arui-private/app-html';

import configureStore from '../../../configure-store';
import routes from '../../../routes';
import readAssetsManifest from '../read-assets-manifest';

const appSettings = config.get('client');

const defaultState = {
    app: {
        error: false
    },
    settings: appSettings
};

const CSP = config.get('csp');
const CSP_HEADER_VALUE =
    Object.keys(CSP).map(optionName => `${optionName} ${CSP[optionName]}`).join('; ');

export const register = (server, options, next) => {
    let assets = readAssetsManifest();

    let handler = async (request, reply) => {
        const contextRoot = config.get('client.contextRoot');
        const basename = contextRoot === '/' ? '' : contextRoot;
        const url = request.url.path;
        const store = configureStore(false)(defaultState);
        const context = {};

        const appCode = (
            <Provider store={ store }>
                <StaticRouter location={ url } basename={ basename } context={ context }>
                    { routes }
                </StaticRouter>
            </Provider>
        );

        let page;

        try {
            const appHtml = renderToString(appCode);
            /* eslint-disable react/no-danger */
            const layoutCode = (
                <AppHtml
                    contextRoot={ contextRoot }
                    pageTitle={ appSettings.pageTitle }
                    appName={ appSettings.projectName }
                    appVersion={ appSettings.version }
                    addAlfaMetrics={ false }
                    hasError={ false }
                    cssFiles={ assets.css }
                    jsFiles={ assets.js }
                    appState={ store.getState() }
                >
                    <div id='react-app' dangerouslySetInnerHTML={ { __html: appHtml } } />
                </AppHtml>
            );
            /* eslint-enable react/no-danger */

            page = renderToStaticMarkup(layoutCode);
        } catch (error) {
            console.error('error during render process', error);
            return reply(Boom.badImplementation());
        }

        if (context.url) {
            return reply().redirect(context.url);
        }

        return reply(page)
            .header('X-FRAME-OPTIONS', 'DENY')
            .header('Content-Security-Policy', CSP_HEADER_VALUE);
    };

    server.route({ method: 'GET', path: '/{whateverPath?}', handler }); // root route
    server.route({ method: 'GET', path: '/{whateverPath*}', handler }); // hack to support several slashes in path
    next();
};

register.attributes = {
    name: 'pages/index'
};

export default register;
