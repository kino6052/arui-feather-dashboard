/* eslint-disable global-require */

import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

const composeEnhancers = typeof window !== 'undefined'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // eslint-disable-line no-underscore-dangle
    : compose;

function configureStore() {
    return (initState = {}, history = null) => {
        const store = createStore(
            reducers,
            initState,
            composeEnhancers(applyMiddleware(
                routerMiddleware(history),
                thunk
            ))
        );

        if (process.env.NODE_ENV !== 'production' && module.hot) {
            module.hot.accept('./reducers/app-reducer', () => {
                store.replaceReducer(require('./reducers').default);
            });
        }

        return store;
    };
}

export default configureStore;
