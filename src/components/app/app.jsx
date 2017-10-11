import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Component } from 'react';
import Type from 'prop-types';

import Page from 'arui-private/page';
import ApplicationMenu from 'arui-private/application-menu';
import ApplicationMenuItem from 'arui-private/application-menu-item';
import ApplicationMenuGroup from 'arui-private/application-menu-group';
import Content from 'arui-private/content';
import ErrorPage from 'arui-private/error-page';
import Header from 'arui-private/header';
import Footer from 'arui-private/footer';

import cn from 'arui-feather/cn';

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
            <div className={ cn() }>
                { this.props.error ? this.renderErrorPage() : this.renderPage() }
            </div>
        );
    }

    renderPage() {
        return (
            <Page
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
                <Content>
                    { this.props.children }
                </Content>
            </Page>
        );
    }

    renderErrorPage() {
        return (
            <ErrorPage returnUrl={ this.props.authPage } header={ <Header /> } />
        );
    }
}

export default App;
