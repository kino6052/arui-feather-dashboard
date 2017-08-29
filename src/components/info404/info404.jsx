import { Component } from 'react';
import ThemeProvider from 'arui-feather/theme-provider';
import ErrorPage from 'arui-private/error-page/fantasy';

export default class Info404 extends Component {
    render() {
        return (
            <ThemeProvider theme='alfa-on-white'>
                <ErrorPage returnUrl='/' title='404' text='Такой страницы не существует :(' />
            </ThemeProvider>
        );
    }
}
