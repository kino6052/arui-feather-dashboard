const path = require('path');
const config = require('config');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const PROXY_ASSETS = config.get('proxyAssets');
const ASSETS_PATH = './assets/';
const WEBPACK_CONFIG_TEMPLATE = require('arui-feather/webpack.config.template.js');
const WEBPACK_CONFIG_TEMPLATE_PRODUCTION = require('arui-feather/webpack.config.template.production.js');
const WEBPACK_CONFIG_TEMPLATE_DEVELOPMENT = require('arui-feather/webpack.config.template.development.js');

const IS_PRODUCTION = (process.env.NODE_ENV === 'production');

var webpackConfig = Object.assign(
    {
        entry: {
            index: [
                './node_modules/arui-feather/src/polyfills.js',
                './src/index.jsx'
            ]
        },
        output: {
            path: path.resolve(__dirname, '.build'),
            publicPath: IS_PRODUCTION ? '.' : '//' + PROXY_ASSETS.host + ':' + PROXY_ASSETS.port + '/',
            filename: ASSETS_PATH + '[name].js'
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

    webpackConfig.module.loaders
        .filter(loader => loader.loader === 'url-loader')
        .forEach(loader => {
            if (loader.query && loader.query.name) {
                loader.query.name = ASSETS_PATH + loader.query.name;
            }
        });

    webpackConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            beautify: true,
            sourceMap: false,
            warnings: false
        }),
        new ExtractTextPlugin(ASSETS_PATH + '[name].css'),
        new CompressionPlugin({
            asset: '[file].gz',
            algorithm: 'gzip',
            regExp: /\.js$|\.css$|\.ttf$|\.svg$/,
            threshold: 10240,
            minRatio: 0.8
        })
    );
} else {
    Object.assign(webpackConfig, WEBPACK_CONFIG_TEMPLATE_DEVELOPMENT);
}

module.exports = webpackConfig;
