import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';

const propTypes = {
    store: PropTypes.object.isRequired
};
const Root = ({ store }) => (
    <Provider store={ store }>
        <Router history={ syncHistoryWithStore(browserHistory, store) } routes={ routes } />
    </Provider>
);

Root.propTypes = propTypes;

export default Root;
