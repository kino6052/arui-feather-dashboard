import { Route, Switch, Redirect } from 'react-router-dom';

import App from './components/app/app';
import ScreenPage from './components/page-screens/page-screens';
import Info404 from './components/info404/info404';

const WrappedComponent = (Component, props) => (
    <App>
        <Component { ...props } />
    </App>
);

export default (
    <Switch>
        <Route
            exact={ true }
            path='/screen/:screenId'
            render={ props => WrappedComponent(ScreenPage, props) }
        />
        <Route
            exact={ true }
            path='/'
            render={ () => <Redirect to='/screen/2' /> }
        />
        <Route component={ Info404 } />
    </Switch>
);
