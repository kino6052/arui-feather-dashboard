/* eslint import/no-extraneous-dependencies: 0 */
/* eslint global-require: 0 */

const path = require('path');
const WEBPACK_CONFIG_TEMPLATE = require('arui-presets/webpack.base');

module.exports = function (config) {
    let webpackConfig = WEBPACK_CONFIG_TEMPLATE;
    webpackConfig.devtool = 'inline-source-map';

    webpackConfig.module.rules.push({
        test: /\.jsx?$/,
        loader: 'isparta-loader',
        include: path.resolve('src')
    });

    let cfg = {
        browsers: ['PhantomJS'],
        plugins: [
            require('karma-webpack'),
            require('karma-chrome-launcher'),
            require('karma-phantomjs-launcher'),
            require('karma-sourcemap-loader'),
            require('karma-mocha'),
            require('karma-mocha-reporter'),
            require('karma-chai'),
            require('karma-chai-spies'),
            require('karma-chai-dom'),
            require('karma-junit-reporter'),
            require('karma-coverage')
        ],
        webpack: webpackConfig,
        webpackServer: {
            noInfo: true
        },
        frameworks: ['mocha', 'chai-spies', 'chai-dom', 'chai'],
        reporters: ['mocha', 'coverage', 'junit'],
        preprocessors: {
            'tests.webpack.js': ['webpack', 'sourcemap']
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
                    lines: 40
                }
            }
        },
        junitReporter: {
            outputFile: 'test-results.xml',
            useBrowserName: false
        },
        singleRun: true
    };

    config.set(cfg);
};
