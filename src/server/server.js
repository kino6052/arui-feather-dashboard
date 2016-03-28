import 'babel-polyfill';

import config from 'config';
import Hapi from 'hapi';
import h2o2 from 'h2o2';

import pluginPageIndex from './plugins/pages/index';
import pluginProxyAssets from './plugins/proxy-assets';

let plugins = [
    pluginPageIndex
];

const PROXY_ASSETS = config.get('proxyAssets');
if (PROXY_ASSETS) {
    plugins.push(
        h2o2,
        { register: pluginProxyAssets, options: PROXY_ASSETS }
    );
}

let server = new Hapi.Server();
server.connection({
    port: config.get('server.port')
});

server.register(plugins, function (error) {
    if (error) {
        throw error;
    }

    server.start(error => {
        if (error) {
            console.log(`Server start failed: ${error.toString()}`);
            throw error;
        }
        console.log(`Server is running: ${server.info.uri}...`);
    });
});
