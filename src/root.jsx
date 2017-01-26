import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, useRouterHistory } from 'react-router';
import routes from './routes';
import { createHistory } from 'history';

const propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object
};

const Root = ({ store }) => {
    const history = useRouterHistory(createHistory)({
        basename: store.getState().settings.contextRoot
    });
    return (
        <Provider store={ store }>
            <Router key={ Date.now() } history={ history } routes={ routes } />
        </Provider>
    );
};

Root.propTypes = propTypes;

export default Root;
