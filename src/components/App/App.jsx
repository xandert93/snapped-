import { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { PublicRoute, ProtectedRoute } from '../../utils';
import { ROUTES } from '../../constants/routes';

import { authContext } from '../../contexts/1.auth/authContext';

import { Auth, Home, Profile, Account, Explore } from '../../pages';
import { NavBar } from '../NavBar';
import { Main } from './Main';
import { UploadModal } from './UploadModal';
import { Snackbar } from './Snackbar';

export default function App() {
  const { user } = useContext(authContext);

  return (
    <>
      {user && <NavBar />}
      <Main>
        <Switch>
          <PublicRoute path={ROUTES.AUTH} component={Auth} />
          <ProtectedRoute exact path={ROUTES.HOME} component={Home} />

          <Redirect
            exact
            from={`/p/${user?.username}`}
            to={`/p/${user?.username}/public`}
          />

          <ProtectedRoute path={ROUTES.PROFILE} component={Profile} />
          <ProtectedRoute path={ROUTES.EXPLORE} component={Explore} />
          <ProtectedRoute path={ROUTES.ACCOUNT} component={Account} />

          {/* <Route render={() => <h5>Not Found 404</h5>} /> */}
          <Route path={ROUTES.NOT_FOUND} render={() => <h5>404 RNF</h5>} />
        </Switch>
      </Main>
      <Snackbar />
      <UploadModal />
    </>
  );
}

//NOTES:
/*
- The <Redirect/> from "/camera-roll" to ".../public" is considered good 
practice in the event someone manually navigates to "/camera-roll". 
They are now redirected to the <ProtectedRoute/> above it.

*/
