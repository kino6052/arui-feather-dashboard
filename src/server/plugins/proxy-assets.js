export const register = (server, options, next) => {
    const handler = (request, reply) =>
        reply.proxy({
            host: options.host,
            port: options.port,
            protocol: 'http'
        });

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
