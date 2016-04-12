const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const WEBPACK_CONFIG_TEMPLATE = require('arui-feather/webpack.config.template.js');
const WEBPACK_CONFIG_TEMPLATE_PRODUCTION = require('arui-feather/webpack.config.template.production.js');
const WEBPACK_CONFIG_TEMPLATE_DEVELOPMENT = require('arui-feather/webpack.config.template.development.js');

const IS_PRODUCTION = (process.env.NODE_ENV === 'production');

var webpackConfig = Object.assign(
    {
        entry: {
            index: './src/index.jsx'
        },
        output: {
            path: path.resolve(__dirname, '.build'),
            publicPath: '/',
            filename: 'assets/[name].js'
        }
    },
    WEBPACK_CONFIG_TEMPLATE
);

webpackConfig.plugins = Array.from(WEBPACK_CONFIG_TEMPLATE.plugins);
webpackConfig.plugins.push(
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
);

if (IS_PRODUCTION) {
    webpackConfig.module.loaders.forEach(loader => {
        var prodLoader = WEBPACK_CONFIG_TEMPLATE_PRODUCTION.module.loaders
            .find(prodLoader => loader.test.toString() === prodLoader.test.toString());

        if (prodLoader) {
            Object.assign(loader, prodLoader);
        }
    });

    webpackConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            beautify: true,
            sourceMap: false,
            warnings: false
        }),
        new ExtractTextPlugin('assets/[name].css')
    );
} else {
    Object.assign(webpackConfig, WEBPACK_CONFIG_TEMPLATE_DEVELOPMENT);
}

module.exports = webpackConfig;
