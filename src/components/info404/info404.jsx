import { Component } from 'react';
import ErrorPage from 'arui-feather/error-page';

export default class Info404 extends Component {
    render() {
        return (
            <ErrorPage
                returnUrl='/'
                title='404'
                text='Такой страницы не существует :('
            />
        );
    }
}
