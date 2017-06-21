/* eslint import/no-extraneous-dependencies: 0 */

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const merge = require('webpack-merge');

const BUILD_PATH = './.build/';
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
            publicPath: '/',
            filename: 'server.js'
        },
        externals: nodeModules,
        module: {
            loaders: [
                {
                    test: /\.ejs$/,
                    loader: 'ejs-compiled'
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
            new webpack.BannerPlugin(
                'require("source-map-support").install();',
                {
                    raw: true,
                    entryOnly: false
                }
            )
        ]
    }
);

module.exports = webpackConfig;
