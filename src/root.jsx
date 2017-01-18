import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from './routes';

const propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object
};

const Root = ({ store, history }) => {
    return (
        <Provider store={ store }>
            <Router key={ Date.now() } history={ history } routes={ routes } />
        </Provider>
    );
};

Root.propTypes = propTypes;

export default Root;
