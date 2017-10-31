/* eslint import/no-extraneous-dependencies: 0 */

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const config = require('config');
const merge = require('webpack-merge');

const PROXY_ASSETS = config.get('proxyAssets');
const ASSETS_PATH = config.get('buildConfig.assetsDir');
const BUILD_PATH = config.get('buildConfig.targetDir');

const IS_PRODUCTION = (process.env.NODE_ENV === 'production');
const ARUI_TEMPLATE = require('arui-presets/webpack.base');

let nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = `commonjs ${mod}`;
    });

let webpackConfig = merge.smart(
    ARUI_TEMPLATE,
    {
        target: 'node',
        node: {
            __filename: true,
            __dirname: true
        },
        entry: ['./src/server/server.js'],
        output: {
            path: path.resolve(__dirname, BUILD_PATH),
            publicPath: IS_PRODUCTION
                ? `${ASSETS_PATH}/`
                : `http://${PROXY_ASSETS.host}:${PROXY_ASSETS.port}/`,
            filename: 'server.js'
        },
        externals: nodeModules,
        module: {
            rules: [
                {
                    test: /\.ejs$/,
                    loader: 'ejs-compiled-loader'
                },
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader'
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }),
            new webpack.NormalModuleReplacementPlugin(/\.css$/, 'node-noop')
        ]
    },
    IS_PRODUCTION ? {} : {
        plugins: [
            new webpack.BannerPlugin({
                banner: 'require("source-map-support").install();',
                raw: true,
                entryOnly: false
            })
        ]
    }
);

module.exports = webpackConfig;
