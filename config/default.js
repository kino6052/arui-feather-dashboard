const packageJson = require('../package.json');

module.exports = {
    server: {
        port: 3000
    },
    devtools: true,
    client: {
        pageTitle: 'ARUI Stub',
        projectName: packageJson.name,
        version: packageJson.version,
        authPage: '/',
        contextRoot: '/'
    },
    csp: {}
};
