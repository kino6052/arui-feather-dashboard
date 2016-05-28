const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const ejs = require('ejs');
const ReactDOMServer = require('react-dom/server');

const webpackConfig = require('./webpack.config.js');
webpackConfig.output.libraryTarget = 'umd';
const compiler = webpack(webpackConfig);

const ASSETS_PATH = './assets/';
const STATIC_PAGE = 'index';
const template = fs.readFileSync('./src/server/plugins/pages/' + STATIC_PAGE + '.html.ejs').toString();
const state = require('./static/state.json');

if (fs.existsSync(webpackConfig.output.path)) {
    rimraf.sync(webpackConfig.output.path);
}

const STATS_OPTIONS = {
    assets: false,
    colors: true,
    version: false,
    modules: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
    reasons: true,
    cached: true,
    chunkOrigins: true
};

compiler.plugin('compile', () => console.log('Building...'));

compiler.run(function(error, stats) {
    if (error) {
        console.error(error.stack || error);
        if (error.details) {
            console.error(error.details);
        }
        process.exit(1);
    }

    process.stdout.write(stats.toString(STATS_OPTIONS) + '\n');

    const render = require(path.resolve(
        webpackConfig.output.path,
        ASSETS_PATH,
        STATIC_PAGE + '.js'
    )).render;

    fs.writeFileSync(
        path.join(webpackConfig.output.path, 'index.html'),
        ejs.render(template, {
            staticAssets: true,
            content: ReactDOMServer.renderToString(render(state)),
            state: JSON.stringify(state)
        })
    );

    console.log('done');
});
