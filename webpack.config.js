const path = require('path');

const IS_PRODUCTION = (process.env.NODE_ENV === 'production');
const WEBPACK_CONFIG_TEMPLATE = require('arui-feather/webpack.config.template.js');

var webpackConfig = Object.assign(
    {
        entry: ['./src/index.jsx'],
        output: {
            path: path.resolve(__dirname, '.build'),
            publicPath: '/',
            filename: 'assets/index.js'
        }
    },
    WEBPACK_CONFIG_TEMPLATE
);

webpackConfig.plugins = Array.from(WEBPACK_CONFIG_TEMPLATE.plugins);

if (!IS_PRODUCTION) {
    webpackConfig.devtool = 'inline-source-map';
}

module.exports = webpackConfig;
