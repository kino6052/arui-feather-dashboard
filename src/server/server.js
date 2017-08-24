/* eslint no-console: ["error", { allow: ["log", "error"] }] */
import 'babel-polyfill';

import config from 'config';
import Hapi from 'hapi';
import h2o2 from 'h2o2';
import inert from 'inert';
import crumb from 'crumb';

import pluginPageIndex from './plugins/pages/index';
import pluginProxyAssets from './plugins/proxy-assets';
import pluginStaticAssets from './plugins/static-assets';

const PROXY_ASSETS = config.get('proxyAssets');

let plugins = [{
    register: pluginPageIndex,
    options: {
        staticAssets: !PROXY_ASSETS,
        assetsHash: !PROXY_ASSETS && eval('require')('./hash.json') // eslint-disable-line
    }
}];

if (PROXY_ASSETS) {
    plugins.push(
        h2o2,
        { register: crumb, options: { key: 'alfa-csrf', restful: true } },
        { register: pluginProxyAssets, options: PROXY_ASSETS }
    );
} else {
    plugins.push(
        inert,
        pluginStaticAssets
    );
}

let server = new Hapi.Server();
server.connection({
    port: config.get('server.port')
});

server.register(plugins, (error) => {
    if (error) {
        throw error;
    }

    server.start((error) => {
        if (error) {
            console.error(`Server start failed: ${error.toString()}`);
            throw error;
        }
        console.log(`Server is running: ${server.info.uri}...`);
    });
});
