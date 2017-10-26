import React from 'react';
import Type from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

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
        <ConnectedRouter history={ history }>
            { routes }
        </ConnectedRouter>
    </Provider>
);

Root.propTypes = propTypes;
Root.defaultProps = defaultProps;

export default Root;
