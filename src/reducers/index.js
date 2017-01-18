import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import appReducer from './app-reducer';
import settingsReducer from './settings-reducer';

export default combineReducers({
    routing: routerReducer,
    settings: settingsReducer,
    app: appReducer
});
