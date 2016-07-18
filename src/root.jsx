import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import App from './components/app/app';

const propTypes = {
    store: PropTypes.object.isRequired
};
const Root = ({ store }) => (
    <Provider store={ store }>
        <App />
    </Provider>
);

Root.propTypes = propTypes;

export default Root;
