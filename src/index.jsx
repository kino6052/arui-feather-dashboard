import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import appReducer from './reducers/app-reducer';
import App from './components/app/app';

import historyPlugin from './plugins/history';

const MIDDLEWARES = [
    thunk
];

const PLUGINS = [
    historyPlugin
];

export function render(state) {
    let store = applyMiddleware(...MIDDLEWARES)(createStore)(appReducer, state);
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
