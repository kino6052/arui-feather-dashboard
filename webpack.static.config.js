const webpack = require('webpack');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const state = require('./static/state.json');

const WEBPACK_MAIN_CONFIG = require('./webpack.config.js');

var webpackConfig = Object.assign({}, WEBPACK_MAIN_CONFIG, {
    entry: {
        index: [
            './node_modules/arui-feather/src/polyfills.js',
            './src/index-static.jsx'
        ]
    },
    output: Object.assign({}, WEBPACK_MAIN_CONFIG.output, {
        libraryTarget: 'umd'
    })
});

webpackConfig.plugins = Array.from(WEBPACK_MAIN_CONFIG.plugins);
webpackConfig.module = {
    loaders: Array.from(WEBPACK_MAIN_CONFIG.module.loaders)
};

webpackConfig.module.loaders.push(
    {
        test: /\.ejs$/, loader: 'ejs-compiled'
    }
);

webpackConfig.plugins.push(
    new webpack.EnvironmentPlugin([
        'SERVER_SIDE_RENDER',
        'CLIENT_SIDE_RENDER'
    ]),
    new StaticSiteGeneratorPlugin(
        'index',
        ['/screen/1'],
        { state: state }
    )
);

module.exports = webpackConfig;
