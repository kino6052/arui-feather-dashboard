module.exports = {
    proxyAssets: false,
    devtools: false,
    csp: {
        'default-src': `'self'`,
        'connect-src': `'self'`,
        'script-src': `'self' click.alfabank.ru 'unsafe-inline'`,
        'frame-src': `'none'`,
        'img-src': `'self' click.alfabank.ru data: 'self'`,
        'font-src': `'self' data:`,
        'object-src': `'none'`,
        'style-src': `'self' 'unsafe-inline'`
    }
};
