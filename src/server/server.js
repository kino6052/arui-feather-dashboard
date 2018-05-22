/* eslint no-console: ["error", { allow: ["log", "error"] }] */
import 'babel-polyfill';

import config from 'config';
import Hapi from 'hapi';
import crumb from 'crumb';

import pluginPageIndex from './plugins/pages/index';

const CONTEXT_ROOT = config.get('client.contextRoot');

let plugins = [
    {
        register: crumb,
        options: {
            key: 'alfa-csrf',
            restful: true,
            cookieOptions: {
                isSecure: false,
                isHttpOnly: false,
                path: CONTEXT_ROOT
            }
        }
    },
    {
        register: pluginPageIndex
    }
];

const server = new Hapi.Server();
server.connection({
    port: config.get('server.port'),
    state: {
        strictHeader: false
    }
});

server.ext('onPostStart', (_, done) => {
    console.log(`Server is running: ${server.info.uri}`);
    done();
});

server.register(plugins, (error) => {
    if (error) {
        throw error;
    }
});

export default server;
