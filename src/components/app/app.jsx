import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FeatherComponent from 'arui-feather/src/feather/feather';
import Page from 'arui-feather/src/page/page';
import ErrorPage from 'arui-feather/src/error-page/error-page';
import Header from 'arui-feather/src/header/header';
import Footer from 'arui-feather/src/footer/footer';
import Menu from 'arui-feather/src/menu/menu';
import User from 'arui-feather/src/user/user';

import { screens } from '../../screen-const.js';
import { changeScreen } from '../../actions/screen';

import cn from 'arui-feather/src/cn';
require('./app.css');

function mapStateToProps(state) {
    return {
        screen: state.app.screen,
        error: state.app.error,
        authPage: state.settings && state.settings.authPage
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ changeScreen }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
@cn('app')
class App extends FeatherComponent {
    handleMenuClick(evt, screenInd) {
        evt.preventDefault();
        this.props.changeScreen(screenInd);
    }

    render(cn) {
        return !this.props.error ? this.renderPage(cn) : this.renderErrorPage(cn);
    }

    renderPage(cn) {
        const menuContent = screens.map((data, ind) => ({
            content: data.title,
            value: data.name,
            props: {
                url: data.path,
                onClick: (evt) => {
                    this.handleMenuClick(evt, ++ind);
                }
            }
        }));

        return (
            <Page
                className={ cn }
                header={
                    <Header
                        menu={
                            <Menu
                                view='horizontal'
                                content={ menuContent }
                            />
                        }
                        user={
                            <User url='#' text='Михаил Фридман' />
                        }
                    />
                }
                footer={ <Footer /> }
            >
                { this.props.children }
            </Page>
        );
    }

    renderErrorPage(cn) {
        return (
            <ErrorPage
                className={ cn }
                returnUrl={ this.props.authPage }
                header={ <Header /> }
            />
        );
    }
}

export default App;
