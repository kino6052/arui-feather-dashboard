/* eslint import/no-extraneous-dependencies: 0 */

const fs = require('fs');
const path = require('path');
const config = require('config');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PROXY_ASSETS = config.get('proxyAssets');
const ASSETS_PATH = config.get('buildConfig.assetsDir');
const BUILD_PATH = config.get('buildConfig.targetDir');
const ARUI_TEMPLATE = require('arui-presets/webpack.base');
const ARUI_DEV_TEMPLATE = require('arui-presets/webpack.development');
const aruiProdConfigBuilder = require('arui-presets/webpack.production-builder');

const ARUI_PROD_TEMPLATE = aruiProdConfigBuilder({ extractOptions: { publicPath: './' } });
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
            publicPath: IS_PRODUCTION ?
                `${ASSETS_PATH}/` :
                `http://${PROXY_ASSETS.host}:${PROXY_ASSETS.port}/${ASSETS_PATH}`,
            filename: IS_PRODUCTION ? '[name].[chunkhash].js' : '[name].js'
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
            new HtmlWebpackPlugin({
                title: 'ARUI Feather Bootstrap',
                filename: '../index.hbs',
                template: require.resolve('./src/server/plugins/pages/index.html.ejs'),
                alwaysWriteToDisk: true,
                inject: false,
                isProduction: IS_PRODUCTION,
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true
                }
            }),
            new HtmlWebpackHarddiskPlugin(),
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
