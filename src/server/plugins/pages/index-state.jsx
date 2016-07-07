import config from 'config';

export function getState(screen) {
    return {
        settings: config.get('client'),
        error: false,
        screen
    };
}
