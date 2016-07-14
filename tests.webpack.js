require('./node_modules/arui-feather/src/polyfills');

var context = require.context('./src/', true, /\-test\.jsx$/);
context.keys().forEach(context);
