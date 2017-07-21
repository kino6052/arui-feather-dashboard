import { Component } from 'react';
import Type from 'prop-types';
import Heading from 'arui-feather/heading/fantasy';
import Paragraph from 'arui-feather/paragraph/fantasy';

import screens from '../../screen-const';

class ScreenPage extends Component {
    static propTypes = {
        pageKey: Type.string,
        routeParams: Type.shape({
            screenId: Type.string.isRequired
        })
    };

    static defaultProps = {
        pageKey: null,
        routeParams: null
    };

    render() {
        const { pageKey, routeParams } = this.props;
        const defaultKey = routeParams
            ? Math.min(screens.length - 1, Math.max(routeParams.screenId - 1, 0))
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
