import { Route, IndexRedirect } from 'react-router';

import App from './components/app/app';
import ScreenPage from './components/page-screens/page-screens';

export default (
    <Route path='/' component={ App }>
        <IndexRedirect to='screen/2' />
        <Route path='screen/:screenId' component={ ScreenPage } />
    </Route>
);
