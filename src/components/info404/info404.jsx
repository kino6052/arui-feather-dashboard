import React, { PropTypes } from 'react';
import Paragraph from 'arui-feather/src/paragraph/paragraph';
import Link from 'arui-feather/src/link/link';

export default class Info404 extends React.Component {
    static propTypes = {
        message: PropTypes.string
    };
    static defaultProps = {
        message: 'Такой страницы не существует :('
    };
    render() {
        return (
            <div>
                <Paragraph>{ this.props.message }</Paragraph>
                <Link url='/' text='На главную страницу' />
            </div>
        );
    }
}
