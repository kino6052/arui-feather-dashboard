const fs = require('fs');
const path = require('path');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config.js');
webpackConfig.entry.unshift('webpack/hot/only-dev-server');
webpackConfig.entry.unshift('webpack-dev-server/client?http://localhost:8080');
webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(compiler, {
    contentBase: webpackConfig.output.path,
    hot: true,
    quiet: false,
    noInfo: false,
    inline: true,
    lazy: false,
    filename: webpackConfig.output.filename,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    publicPath: webpackConfig.output.publicPath,
    headers: { 'X-Custom-Header': 'yes' },
    stats: { colors: true }
});

server.listen(8080, 'localhost', function() {
    console.log('Server running at http://localhost:8080/');
});
