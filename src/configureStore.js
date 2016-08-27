import { applyMiddleware, createStore, combineReducers } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { browserHistory } from 'react-router';
import appReducer from './reducers/app-reducer';
import thunk from 'redux-thunk';

const reducers = {
    routing: routerReducer,
    app: appReducer
};

const middlewares = [
    routerMiddleware(browserHistory), thunk
];

function configureStore(isHotLoaderRequired = false) {
    return (initState = {}) => {
        const store = createStore(
            combineReducers(reducers),
            initState,
            applyMiddleware(...middlewares));

        if (isHotLoaderRequired && module.hot) {
            // module.hot.accept('./reducers/app-reducer', () => {
            //     store.replaceReducer(require('./reducers/app-reducer').default);
            // });
        }

        return store;
    };
}

export default configureStore;
