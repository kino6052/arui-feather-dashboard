/* eslint import/no-extraneous-dependencies: 0 */

const fs = require('fs');
const path = require('path');
const config = require('config');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PROXY_ASSETS = config.get('proxyAssets');
const ASSETS_PATH = './assets/';
const BUILD_PATH = './.build/';
const ARUI_TEMPLATE = require('arui-presets/webpack.base');
const ARUI_DEV_TEMPLATE = require('arui-presets/webpack.development');
const ARUI_PROD_TEMPLATE = require('arui-presets/webpack.production');

const IS_PRODUCTION = (process.env.NODE_ENV === 'production');

let webpackConfig = merge.smart(
    ARUI_TEMPLATE,
    {
        entry: {
            index: [
                './node_modules/arui-feather/polyfills.js',
                './src/index.jsx'
            ]
        },
        output: {
            path: path.resolve(__dirname, BUILD_PATH, ASSETS_PATH),
            publicPath: IS_PRODUCTION ? './' : `http://${PROXY_ASSETS.host}:${PROXY_ASSETS.port}/assets/`,
            filename: IS_PRODUCTION ? '[name].[hash].js' : '[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                'process.HOT_LOADER': process.env.HOT_LOADER
            }),
            new CopyWebpackPlugin([
                {
                    from: path.resolve(__dirname, 'src/icons'),
                    to: path.resolve(BUILD_PATH, ASSETS_PATH)
                }
            ])
        ]
    },
    IS_PRODUCTION ? ARUI_PROD_TEMPLATE : ARUI_DEV_TEMPLATE
);

if (IS_PRODUCTION) {
    webpackConfig.plugins.push(
        function () {
            this.plugin('done', function (stats) {
                fs.writeFileSync(
                    path.join(__dirname, BUILD_PATH, 'hash.json'),
                    JSON.stringify(stats.toJson().hash, null, 2)
                );
            });
        }
    );
}

module.exports = webpackConfig;
