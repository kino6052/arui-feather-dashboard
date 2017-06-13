import { Component } from 'react';
import Type from 'prop-types';
import AppTitle from 'arui-feather/app-title';
import AppContent from 'arui-feather/app-content';
import Heading from 'arui-feather/heading';
import Paragraph from 'arui-feather/paragraph';

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
                <AppTitle>
                    <Heading>{ title }</Heading>
                </AppTitle>
                <AppContent>
                    <Paragraph>{ about }</Paragraph>
                </AppContent>
            </div>
        );
    }
}

export default ScreenPage;
