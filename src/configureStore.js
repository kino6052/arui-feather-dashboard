import { applyMiddleware, createStore } from 'redux';
import appReducer from './reducers/app-reducer';

import thunk from 'redux-thunk';

import historyPlugin from './plugins/history';

const MIDDLEWARES = [
    thunk
];

const PLUGINS = [
    historyPlugin
];

function configureStore(isHotLoaderRequired = false) {
    const middleware = applyMiddleware(...MIDDLEWARES);

    return state => {
        const store = createStore(appReducer, state, middleware);
        PLUGINS.forEach(plugin => plugin(store));

        if (isHotLoaderRequired && module.hot) {
            module.hot.accept('./reducers/app-reducer', () => {
                store.replaceReducer(require('./reducers/app-reducer').default);
            });
        }

        return store;
    };
}

export default configureStore;
