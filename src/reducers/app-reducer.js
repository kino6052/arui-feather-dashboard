import { CHANGE_SCREEN } from '../actions/types';

export default function appReducer(state = {}, action) {
    if (action.type === CHANGE_SCREEN) {
        return Object.assign({}, state, { screen: action.screen });
    }

    return state;
}
