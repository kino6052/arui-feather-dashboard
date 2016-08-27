import React, { PropTypes } from 'react';
import AppTitle from 'arui-feather/src/app-title/app-title';
import AppContent from 'arui-feather/src/app-content/app-content';
import Heading from 'arui-feather/src/heading/heading';
import Paragraph from 'arui-feather/src/paragraph/paragraph';

import { screens } from '../../screen-const.js';

class ScreenPage extends React.Component {
    static propTypes = {
        pageKey: PropTypes.string,
        routeParams: PropTypes.any
    };
    render() {
        const { pageKey, routeParams } = this.props;
        const defaultKey = routeParams ? Math.min(screens.length - 1, Math.max(routeParams.screenId - 1, 0)) : 0;
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
