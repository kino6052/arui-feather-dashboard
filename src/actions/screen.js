import { push } from 'react-router-redux';

export function changeScreen(screen) {
    return push(`/screen/${screen}`);
}
