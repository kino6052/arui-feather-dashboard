/* eslint-disable global-require */

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import createHistory from 'history/createBrowserHistory';

import Root from './root';
import configureStore from './configure-store';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const HOT_LOADER = !!process.HOT_LOADER && !IS_PRODUCTION;
const CAN_USE_DOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

let configureStoreLocal = configureStore(HOT_LOADER);

if (typeof window !== 'undefined') {
    // eslint-disable-next-line no-underscore-dangle
    window.__main = (state) => {
        const history = CAN_USE_DOM
            ? createHistory({
                basename: (state.settings && state.settings.contextRoot) || ''
            })
            : null;

        let store = configureStoreLocal(state, history);

        if (HOT_LOADER) {
            ReactDOM.render(
                <AppContainer>
                    <Root store={ store } history={ history } />
                </AppContainer>,
                document.getElementById('react-app')
            );

            if (module.hot) {
                module.hot.accept(['./root', './configure-store'], () => {
                    let NextAppAssignments = require('./root').default;

                    ReactDOM.render(
                        <AppContainer>
                            <NextAppAssignments store={ store } history={ history } />
                        </AppContainer>,
                        document.getElementById('react-app')
                    );
                });
            }
        } else {
            ReactDOM.render(<Root store={ store } history={ history } />, document.getElementById('react-app'));
        }
    };
}
