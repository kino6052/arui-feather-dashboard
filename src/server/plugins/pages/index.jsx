/* eslint no-console: ["error", { allow: ["log", "error"] }] */
/* eslint consistent-return: "off" */
import { renderToString } from 'react-dom/server';
import path from 'path';
import handlebars from 'handlebars';
import fs from 'fs';
import Boom from 'boom';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import config from 'config';
import configureStore from '../../../configure-store';
import routes from '../../../routes';

const IS_PRODUCTION = (process.env.NODE_ENV === 'production');

const defaultState = {
    app: {
        error: false
    },
    settings: config.get('client')
};

const CSP = config.get('csp');
const CSP_HEADER_VALUE =
    Object.keys(CSP).map(optionName => `${optionName} ${CSP[optionName]}`).join('; ');

let template;
export const register = (server, options, next) => {
    let handler = async (request, reply) => {
        if (!template) { // лениво инициализируем темплейт чтобы не использовать темплейт с предыдущей сборки
            template = handlebars.compile(
                fs.readFileSync(path.join(process.cwd(), config.get('buildConfig.targetDir'), 'index.hbs'), 'utf8')
            );
        }
        const contextRoot = config.get('client.contextRoot');
        const path = request.url.path;
        const store = configureStore(false)(defaultState);
        const context = {};

        if (context.url) {
            return reply().redirect(context.url);
        }

        const appCode = (
            <Provider store={ store }>
                <StaticRouter url={ path } context={ context }>
                    { routes }
                </StaticRouter>
            </Provider>
        );

        let page;

        try {
            page = template({
                content: renderToString(appCode),
                state: JSON.stringify(store.getState()),
                contextRoot: contextRoot ? path.normalize(`${contextRoot}/`) : ''
            });
        } catch (error) {
            console.error('error during render process', error);
            return reply(Boom.badImplementation());
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
