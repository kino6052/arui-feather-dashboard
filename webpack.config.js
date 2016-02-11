const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const WEBPACK_CONFIG_TEMPLATE = require('arui-feather/webpack.config.template.js');

var webpackConfig = Object.assign(
    {
        entry: ['./src/app.js'],
        output: {
            path: path.resolve(__dirname, '.build'),
            publicPath: '/',
            filename: 'app.js'
        }
    },
    WEBPACK_CONFIG_TEMPLATE
);

webpackConfig.plugins.push(new CopyWebpackPlugin([
    {
        from: './src/index.html',
        to: './index.html'
    }
]));

module.exports = webpackConfig;
