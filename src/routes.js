import { Route, IndexRedirect } from 'react-router';

import App from './components/app/app';
import ScreenPage from './components/page-screens/page-screens';
import Info404 from './components/info404/info404';

export default (
    <Route path='/'>
        <IndexRedirect to='screen/2' />
        <Route path='screen' component={ App }>
            <Route path=':screenId' component={ ScreenPage } />
        </Route>
        <Route path='*' component={ Info404 } />
    </Route>
);
