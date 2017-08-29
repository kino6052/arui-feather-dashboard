import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Component } from 'react';
import Type from 'prop-types';

import Page from 'arui-private/page/fantasy';
import ApplicationMenu from 'arui-private/application-menu/fantasy';
import ApplicationMenuItem from 'arui-private/application-menu-item/fantasy';
import ApplicationMenuGroup from 'arui-private/application-menu-group/fantasy';
import Content from 'arui-private/content/fantasy';
import ErrorPage from 'arui-private/error-page/fantasy';
import Header from 'arui-private/header/fantasy';
import Footer from 'arui-private/footer/fantasy';
import Menu from 'arui-feather/menu/fantasy';
import ThemeProvider from 'arui-feather/theme-provider';
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
    static propTypes = {
        error: Type.bool,
        authPage: Type.string,
        changeScreen: Type.func,
        children: Type.node
    };

    render(cn) {
        return (
            <ThemeProvider theme='alfa-on-white'>
                { this.props.error ? this.renderErrorPage(cn) : this.renderPage(cn) }
            </ThemeProvider>
        );
    }

    renderPage(cn) {
        const menuContent = screens.map((data, index) => ({
            content: data.title,
            value: data.name,
            props: {
                url: data.path,
                onClick: (event) => { this.handleMenuClick(event, index + 1); }
            }
        }));

        return (
            <Page
                className={ cn }
                header={
                    <Header
                        menu={
                            <ApplicationMenu>
                                <ApplicationMenuItem url='/screen/1'>
                                    Экран 1
                                </ApplicationMenuItem>
                                <ApplicationMenuItem url='/screen/2'>
                                    Экран 2
                                </ApplicationMenuItem>
                                <ApplicationMenuItem url='/screen/3'>
                                    Экран 3
                                </ApplicationMenuItem>
                                <ApplicationMenuGroup title='Группа меню' url='#'>
                                    <ApplicationMenuItem url='/screen/1'>
                                        Экран 1
                                    </ApplicationMenuItem>
                                    <ApplicationMenuItem url='/screen/2'>
                                        Экран 2
                                    </ApplicationMenuItem>
                                </ApplicationMenuGroup>
                            </ApplicationMenu>
                        }
                    />
                }
                footer={ <Footer /> }
            >
                <Content theme='alfa-on-white'>
                    { this.props.children }
                </Content>
            </Page>
        );
    }

    renderErrorPage(cn) {
        return (
            <ErrorPage className={ cn } returnUrl={ this.props.authPage } header={ <Header /> } />
        );
    }
}

export default App;
