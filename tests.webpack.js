require('./node_modules/arui-feather/polyfills');

const context = require.context('./src/', true, /-test\.jsx$/);
context.keys().forEach(context);
