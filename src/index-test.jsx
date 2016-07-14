import appReducer from './reducers/app-reducer';
import { changeScreen } from './actions/screen';

describe('test appReducer', function () {
    it('it should change screen to SCREEN_2 during changeScreen action processing', () => {
        let state = {
            screen: 'SCREEN_1'
        };

        let nextState = appReducer(state, changeScreen('SCREEN_2'));

        nextState.screen.should.to.equal('SCREEN_2');
    });
});
