import React from 'react';
import ReactDOM from 'react-dom';

import Root from './root';
import configureStore from './configureStore';
import { AppContainer } from 'react-hot-loader';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const HOT_LOADER = !!process.HOT_LOADER && !IS_PRODUCTION;

let configureStoreLocal = configureStore(HOT_LOADER);

if (typeof window !== 'undefined') {
    window.__main = state => {
        let store = configureStoreLocal(state);

        if (HOT_LOADER) {
            ReactDOM.render(
                <AppContainer>
                    <Root store={ store } />
                </AppContainer>,
                document.getElementById('react-app')
            );

            if (module.hot) {
                module.hot.accept(['./root', './configureStore'], () => {
                    let NextAppAssignments = require('./root').default;

                    ReactDOM.render(
                        <AppContainer>
                            <NextAppAssignments store={ store } />
                        </AppContainer>,
                        document.getElementById('react-app')
                    );
                });
            }
        } else {
            ReactDOM.render(<Root store={ store } />, document.getElementById('react-app'));
        }
    };
}

export function renderStatic(state) {
    let store = configureStoreLocal(state);

    return (
        <Root store={ store } />
    );
}
