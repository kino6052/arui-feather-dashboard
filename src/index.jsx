import React from 'react';
import ReactDOM from 'react-dom';

import Root from './root';
import configureStore from './configureStore';
import { AppContainer } from 'react-hot-loader';

let configureStoreLocal = configureStore();

if (typeof window !== 'undefined') {
    window.__main = state => {
        let store = configureStoreLocal(state);

        ReactDOM.render(<AppContainer><Root store={ store } /></AppContainer>, document.getElementById('react-app'));

        if (process.env.NODE_ENV !== 'production' && module.hot) {
            module.hot.accept(['./root', './configureStore'], () => {
                let NextAppAssignments = require('./root').default;

                ReactDOM.render(
                    <AppContainer>
                        <NextAppAssignments store={ store } />
                    </AppContainer>,
                    document.getElementById('react-app'));
            });
        }
    };
}
