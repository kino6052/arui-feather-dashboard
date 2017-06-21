import { Component } from 'react';
import ErrorPage from 'arui-feather/error-page';
import Logo from 'arui-private/logo';

export default class Info404 extends Component {
    render() {
        return (
            <ErrorPage
                logo={ <Logo view='full' theme='alfa-on-color' /> }
                returnUrl='/'
                title='404'
                text='Такой страницы не существует :('
            />
        );
    }
}
