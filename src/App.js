import { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { PublicRoute, ProtectedRoute } from './helpers';
import { ROUTES } from './constants/routes';

import Auth from './pages/public/Auth';

import Home from './components/protected/pages/Home/Home';
import MyAccount from './components/protected/pages/MyAccount/MyAccount';
import NavBar from './components/protected/layout/NavBar';

import authContext from './contexts/1.auth/authContext';
import Main from './components/protected/pages/Main';

import UploadModal from './components/protected/UploadModal';

import Profile from './pages/protected/Profile';

const App = () => {
  const { currentUserDoc } = useContext(authContext);

  return (
    <>
      {currentUserDoc && <NavBar />}
      <Main>
        <Switch>
          <PublicRoute path={ROUTES.AUTH} component={Auth} />
          <ProtectedRoute exact path={ROUTES.HOME} component={Home} />

          <Redirect
            exact
            from={`/p/${currentUserDoc?.username}`}
            to={`/p/${currentUserDoc?.username}/public`}
          />

          <ProtectedRoute path={ROUTES.PROFILE} component={Profile} />
          <ProtectedRoute path={ROUTES.ACCOUNT} component={MyAccount} />

          {/* <Route render={() => <h5>Not Found 404</h5>} /> */}
          <Route path={ROUTES.NOT_FOUND} render={() => <h5>404 RNF</h5>} />
        </Switch>
      </Main>
      <UploadModal />
    </>
  );
};

export default App;

//NOTES:
/*
- The <Redirect/> from "/camera-roll" to ".../public" is considered good 
practice in the event someone manually navigates to "/camera-roll". 
They are now redirected to the <ProtectedRoute/> above it.

*/

// p/:username
