import React from 'react';
import ErrorPage from 'arui-feather/src/error-page/error-page';

export default class Info404 extends React.Component {
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
