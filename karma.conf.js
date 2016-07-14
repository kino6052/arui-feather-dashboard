const path = require('path');
const webpack = require('webpack');
const WEBPACK_CONFIG_TEMPLATE = require('./node_modules/arui-feather/webpack.config.template.js');

module.exports = function (config) {
    var webpackConfig = WEBPACK_CONFIG_TEMPLATE;
    webpackConfig.devtool = 'inline-source-map';

    webpackConfig.module.loaders.push({
        test: /\.jsx$/,
        loader: 'isparta',
        include: path.resolve('src'),
    });

    var cfg = {
        browsers: ['Chrome'],
        plugins: [
            require('karma-webpack'),
            require('karma-chrome-launcher'),
            require('karma-sourcemap-loader'),
            require('karma-mocha'),
            require('karma-mocha-reporter'),
            require('karma-chai'),
            require('karma-chai-spies'),
            require('karma-chai-dom'),
            require('karma-jenkins-reporter'),
            require('karma-coverage')
        ],
        webpack: webpackConfig,
        webpackServer: {
            noInfo: true,
        },
        frameworks: ['mocha', 'chai-spies', 'chai-dom', 'chai'],
        reporters: ['mocha', 'coverage', 'jenkins'],
        preprocessors: {
            'tests.webpack.js': ['webpack', 'sourcemap'],
        },
        files: [
            'tests.webpack.js'
        ],
        coverageReporter: {
            check: {
                global: {
                    statements: 86,
                    branches: 80,
                    functions: 95,
                    lines: 40,
                },
            },
        },
        singleRun: true
    };

    config.set(cfg);
};
