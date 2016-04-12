import ReactDOM from 'react-dom';
import FeatherComponent from 'arui-feather/src/feather/feather';

import Page from 'arui-feather/src/page/page';
import Header from 'arui-feather/src/header/header';
import Footer from 'arui-feather/src/footer/footer';
import AppTitle from 'arui-feather/src/app-title/app-title';
import AppContent from 'arui-feather/src/app-content/app-content';
import Heading from 'arui-feather/src/heading/heading';
import Paragraph from 'arui-feather/src/paragraph/paragraph';
import Menu from 'arui-feather/src/menu/menu';
import User from 'arui-feather/src/user/user';

import { changeScreen } from '../../actions/screen';

import cn from 'arui-feather/src/cn';
require('./app.css');

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return { screen: state.screen };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ changeScreen }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
@cn('app')
class App extends FeatherComponent {
    render(cn) {
        return (
            <Page
                className={ cn }
                header={
                    <Header
                        menu={
                            <Menu
                                view="horizontal"
                                content={[
                                    {
                                        content: 'Экран 1',
                                        value: 'screen1',
                                        props: {
                                            url: './screen1',
                                            onClick: (e) => {
                                                this.handleMenuClick(e, 'screen1');
                                            }
                                        }
                                    },
                                    {
                                        content: 'Экран 2',
                                        value: 'screen2',
                                        props: {
                                            url: './screen2',
                                            onClick: (e) => {
                                                this.handleMenuClick(e, 'screen2');
                                            }
                                        }
                                    },
                                    {
                                        content: 'Экран 3',
                                        value: 'screen3',
                                        props: {
                                            url: './screen3',
                                            onClick: (e) => {
                                                this.handleMenuClick(e, 'screen3');
                                            }
                                        }
                                    }
                                ]}
                            />
                        }
                        user={
                            <User url="#" text="Михаил Фридман" />
                        }
                    />
                }
                footer={ <Footer /> }
            >
                { this.renderScreen(cn, this.props.screen) }
            </Page>
        );
    }

    renderScreen(cn, screen) {
        if (screen === 'screen1') {
            return (
                <div>
                    <AppTitle>
                        <Heading>Screen 1</Heading>
                    </AppTitle>
                    <AppContent>
                        <Paragraph>
                            Чистая прибыль Банковской группы выросла в 15 раз по сравнению с предыдущим годом и
                            достигла 480 млн. долларов США (против 33 млн. долларов США по итогам 2014 года).
                            Операционная прибыль до создания резервов составила 2 257 млн. долларов США
                            (снижение на 12,9% по сравнению с 2014 годом объясняется ослаблением среднего
                            курса рубля — на 58,7% за год). В рублевом эквиваленте операционная прибыль
                            до создания резервов выросла в 2015 году более чем на треть (+38,2%).
                        </Paragraph>
                    </AppContent>
                </div>
            );
        } else if (screen === 'screen2') {
            return (
                <div>
                    <AppTitle>
                        <Heading>Screen 2</Heading>
                    </AppTitle>
                    <AppContent>
                        <Paragraph>
                            В 2015 году улучшился показатель стоимости риска Банковской
                            группы «Альфа-Банк» — уменьшение с 3.96% до 3.12%, благодаря
                            снижению темпов роста проблемной задолженности. При этом
                            традиционно консервативный подход в анализе рисков отразился
                            в увеличении ставки резервирования с 5,8% до 6,5%.
                        </Paragraph>
                    </AppContent>
                </div>
            );
        }

        return (
            <div>
                <AppTitle>
                    <Heading>Screen 3</Heading>
                </AppTitle>
                <AppContent>
                    <Paragraph>
                        Положительная динамика на рынке ценных бумаг и волатильность на валютном рынке
                        позволили Банковской группе «Альфа-Банк» получить в 2015 году значительный доход
                        по операциям с ценными бумагами, деривативами и иностранной валютой
                        в размере 334 млн. долларов США.
                    </Paragraph>
                </AppContent>
            </div>
        );
    }

    handleMenuClick(e, screen) {
        e.preventDefault();
        this.props.changeScreen(screen);
    }
}

export default App;