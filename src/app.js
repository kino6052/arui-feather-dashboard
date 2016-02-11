import ReactDOM from 'react-dom';
import FeatherComponent from 'arui-feather/src/feather/feather';

import Page from 'arui-feather/src/page/page';
import Header from 'arui-feather/src/header/header';
import Footer from 'arui-feather/src/footer/footer';
import Heading from 'arui-feather/src/heading/heading';

import cn from 'arui-feather/src/cn';
require('./app.css');

@cn('app')
class App extends FeatherComponent {
    render(cn) {
        return (
            <Page
                className={ cn }
                header={ <Header /> }
                footer={ <Footer /> }
            >
                <Heading>Content</Heading>
            </Page>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('react-app'));
