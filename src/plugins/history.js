/* global history */
/* eslint no-restricted-globals: ["off", "history"] */


import { changeScreen } from '../actions/screen';
import { screens } from '../screen-const';

function findScreenByPathname(pathname) {
    let screenKey = Object.keys(screens).find(key => screens[key].path === pathname);
    return screenKey && screens[screenKey];
}

function findScreenByName(screenName) {
    let screenKey = Object.keys(screens).find(key => screens[key].name === screenName);
    return screenKey && screens[screenKey];
}

function pushHistoryState(state) {
    let url = findScreenByName(state.screen).path;
    history.pushState(null, '', url);
}

export default function historyPlugin(store) {
    if (typeof window === 'undefined') {
        return;
    }

    let prevState = store.getState();
    let isStateChangeTriggeredByRoute = false;

    store.subscribe(() => {
        if (isStateChangeTriggeredByRoute) {
            isStateChangeTriggeredByRoute = false;
            return;
        }

        let state = store.getState();

        if (state.screen !== prevState.screen) {
            prevState = state;
            pushHistoryState(state);
        }
    });

    window.addEventListener('popstate', () => {
        let nextScreen = findScreenByPathname(window.location.pathname);
        if (nextScreen) {
            isStateChangeTriggeredByRoute = true;
            store.dispatch(changeScreen(nextScreen.name));
        }
    });
}
