import React from 'react';
import Type from 'prop-types';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import routes from './routes';

const propTypes = {
    store: Type.shape().isRequired,
    history: Type.shape()
};

const defaultProps = {
    history: null
};

const Root = ({ store, history }) => (
    <Provider store={ store }>
        <Router key={ Date.now() } history={ history } routes={ routes } />
    </Provider>
);

Root.propTypes = propTypes;
Root.defaultProps = defaultProps;

export default Root;
