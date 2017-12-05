import { Component } from 'react';
import Type from 'prop-types';
import Heading from 'arui-feather/heading';
import Paragraph from 'arui-feather/paragraph';

import screens from '../../screen-const';

class ScreenPage extends Component {
    static propTypes = {
        pageKey: Type.string,
        routeParams: Type.shape({}),
        match: Type.shape({
            params: Type.shape({
                screenId: Type.string.isRequired
            })
        })
    };

    static defaultProps = {
        pageKey: null,
        routeParams: null
    };

    render() {
        const { pageKey, match: { params } } = this.props;
        const defaultKey = params
            ? Math.min(screens.length - 1, Math.max(params.screenId - 1, 0))
            : 0;
        const { about, title } = screens[pageKey || defaultKey];
        return (
            <div>
                <Heading>{ title }</Heading>
                <Paragraph>{ about }</Paragraph>
            </div>
        );
    }
}

export default ScreenPage;
