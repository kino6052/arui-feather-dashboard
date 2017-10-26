import { Route, Switch, Redirect } from 'react-router-dom';

import App from './components/app/app';
import ScreenPage from './components/page-screens/page-screens';
import Info404 from './components/info404/info404';

export default (
    <App>
        <Switch>
            <Redirect from='/' to='/screen/2' exact={ true } />
            <Route exact={ true } path={ '/screen/:screenId' } component={ ScreenPage } />
            <Route component={ Info404 } />
        </Switch>
    </App>
);
