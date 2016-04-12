const path = require('path');

export let register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/assets/{resource}',
        config: {
            auth: null
        },
        handler: {
            directory: {
                path: path.join(process.cwd(), '.build', 'assets'),
                listing: false,
                lookupCompressed: true
            }
        }
    });

    next();
};

register.attributes = {
    name: 'static-assets'
};

export default register;
