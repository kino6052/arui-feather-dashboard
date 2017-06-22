/* eslint import/no-extraneous-dependencies: 0 */

const mq = require('arui-feather/mq/mq.json');
const aruiConfig = require('arui-presets/postcss');

module.exports = aruiConfig(mq);
