import config from 'config';

export async function prepareStateForIndexPage(screen) {
    let initialState = {};

    initialState.settings = config.get('app');
    initialState.hasError = false;
    initialState.screen = screen;

    return initialState;
}
