import config from 'config';

export function getState(screen) {
    return {
        app: {
            settings: config.get('client'),
            error: false,
            screen
        }
    };
}
