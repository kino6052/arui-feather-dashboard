import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Component } from 'react';

import Page from 'arui-feather/page';
import ErrorPage from 'arui-feather/error-page';
import Header from 'arui-feather/header';
import Footer from 'arui-feather/footer';
import Menu from 'arui-feather/menu';
import User from 'arui-feather/user';
import cn from 'arui-feather/cn';

import screens from '../../screen-const';
import { changeScreen } from '../../actions/screen';

import './app.css';

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
class App extends Component {
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
                    this.handleMenuClick(evt, ind + 1);
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
