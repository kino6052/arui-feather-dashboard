/* eslint-disable global-require */

import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

function configureStore(isHotLoaderRequired = false) {
    return (initState = {}, history = null) => {
        const store = createStore(
            reducers,
            initState,
            applyMiddleware(
                routerMiddleware(history),
                thunk
            )
        );

        if (isHotLoaderRequired && module.hot) {
            module.hot.accept('./reducers/app-reducer', () => {
                store.replaceReducer(require('./reducers').default);
            });
        }

        return store;
    };
}

export default configureStore;
