import { applyMiddleware, createStore, combineReducers } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { browserHistory } from 'react-router';
import appReducer from './reducers/app-reducer';

const reducers = {
    routing: routerReducer,
    app: appReducer
};

import thunk from 'redux-thunk';

const MIDDLEWARES = [
    routerMiddleware(browserHistory), thunk
];

function configureStore(isHotLoaderRequired = false) {
    const middleware = applyMiddleware(...MIDDLEWARES);

    return (state = {}) => {
        const store = createStore(combineReducers(reducers), state, middleware);

        if (isHotLoaderRequired && module.hot) {
            module.hot.accept('./reducers/app-reducer', () => {
                store.replaceReducer(require('./reducers/app-reducer').default);
            });
        }

        return store;
    };
}

export default configureStore;
