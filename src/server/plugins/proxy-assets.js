export let register = function (server, options, next) {
    let handler = function (request, reply) {
        return reply.proxy({
            host: options.host,
            port: options.port,
            protocol: 'http'
        });
    };

    server.route({
        method: 'GET',
        path: '/assets/{resource}',
        handler
    });

    next();
};

register.attributes = {
    name: 'proxy-assets'
};

export default register;
