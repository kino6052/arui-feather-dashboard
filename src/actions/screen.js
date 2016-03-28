import { CHANGE_SCREEN } from './types';

export function changeScreen(screen) {
    return {
        type: CHANGE_SCREEN,
        screen
    };
}
