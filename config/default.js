module.exports = {
    server: {
        port: 8080
    },
    buildConfig: {
        targetDir: '.build',
        assetsDir: 'assets'
    },
    proxyAssets: {
        host: 'localhost',
        port: 9090
    },
    devtools: true,
    client: {
        authPage: '/',
        contextRoot: ''
    },
    csp: {}
};
