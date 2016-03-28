import 'arui-feather/src/polyfills';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import appReducer from './reducers/app-reducer';
import App from './components/app/app';

import historyPlugin from './plugins/history';

const PLUGINS = [
    historyPlugin
];

export function render(state) {
    let store = createStore(appReducer, state);
    PLUGINS.forEach(plugin => plugin(store));

    return (
        <Provider store={ store }>
            <App />
        </Provider>
    );
}

if (typeof window !== 'undefined') {
    window.__main = state => {
        ReactDOM.render(render(state), document.getElementById('react-app'));
    };
}
