import React, { PropTypes } from 'react';
import AppTitle from 'arui-feather/src/app-title/app-title';
import AppContent from 'arui-feather/src/app-content/app-content';
import Heading from 'arui-feather/src/heading/heading';
import Paragraph from 'arui-feather/src/paragraph/paragraph';

class ScreenPage extends React.Component {
    static propTypes = {
        about: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    };
    render() {
        const { about, title } = this.props;
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
