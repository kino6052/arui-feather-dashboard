/* eslint-disable global-require */

import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';

import reducers from './reducers';

const CAN_USE_DOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
export const history = CAN_USE_DOM ? createHistory() : null;

function configureStore(isHotLoaderRequired = false) {
    return (initState = {}) => {
        const store = createStore(
            reducers,
            initState,
            applyMiddleware(
                routerMiddleware(history),
                thunk
            ));

        if (isHotLoaderRequired && module.hot) {
            module.hot.accept('./reducers/app-reducer', () => {
                store.replaceReducer(require('./reducers').default);
            });
        }

        return store;
    };
}

export default configureStore;
