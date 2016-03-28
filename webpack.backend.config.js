const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const IS_PRODUCTION = (process.env.NODE_ENV === 'production');
const WEBPACK_CONFIG_TEMPLATE = require('arui-feather/webpack.config.template.js');

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

var webpackConfig = Object.assign(
    {
        target: 'node',
        entry: ['./src/server/server.js'],
        output: {
            path: path.resolve(__dirname, '.build'),
            publicPath: '/',
            filename: 'server.js'
        },
        externals: nodeModules
    },
    WEBPACK_CONFIG_TEMPLATE
);

webpackConfig.plugins = Array.from(WEBPACK_CONFIG_TEMPLATE.plugins);

webpackConfig.module.loaders.push({
    test: /\.ejs$/,
    loader: 'ejs-compiled'
});

webpackConfig.plugins.push(
    new webpack.NormalModuleReplacementPlugin(/\.css$/, 'node-noop')
);

if (!IS_PRODUCTION) {
    webpackConfig.plugins.push(
        new webpack.BannerPlugin(
            'require("source-map-support").install();',
            {
                raw: true,
                entryOnly: false
            }
        )
    );
    webpackConfig.devtool = 'inline-source-map';
}

module.exports = webpackConfig;
