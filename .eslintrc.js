module.exports = {
    extends: [
        require.resolve('arui-presets/eslint')
    ],
    root: true,
    settings: {
        'import/resolver': {
            'node': {
                'extensions': [
                    '.js',
                    '.jsx',
                    '.ts',
                    '.tsx'
                ]
            },
        }
    },
    rules: {
        'import/extensions': ['error', 'always', {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never'
        }],
    }
};
