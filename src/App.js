import { useContext } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { PublicRoute, ProtectedRoute } from './helpers';
import { ROUTES } from './constants/routes';

import Auth from './components/public/Auth';

import CameraRoll from './components/protected/pages/CameraRoll/CameraRoll';
import Home from './components/protected/pages/Home/Home';
import MyAccount from './components/protected/pages/MyAccount/MyAccount';
import NavBar from './components/protected/layout/NavBar';

import authContext from './contexts/1.auth/authContext';
import Main from './components/protected/pages/Main';

import SlidingModal from './components/protected/SlidingModal';
import Progress from './components/protected/layout/Progress/Progress';

import AltUser from './components/protected/pages/AlternateUser/AltUser';
import CreatePost from './components/protected/pages/Home/Posts/CreatePost';

import { uploadContext } from './contexts/2.upload/uploadContext';

const App = () => {
  const { currentUserDoc } = useContext(authContext);
  const { file, resetForm, dataURL } = useContext(uploadContext);
  return (
    <>
      {currentUserDoc && <NavBar />}
      <Main>
        <Switch>
          <PublicRoute path={ROUTES.AUTH} component={Auth} />
          <ProtectedRoute exact path={ROUTES.HOME} component={Home} />
          <ProtectedRoute path="/camera-roll/:tabName" component={CameraRoll} />
          <Redirect exact from="/camera-roll" to="/camera-roll/public" />

          <Redirect
            from={`/p/${currentUserDoc?.username}`}
            to={'/camera-roll/public'}
          />
          <ProtectedRoute path="/p/:username" component={AltUser} />

          <ProtectedRoute path={ROUTES.USER_ACCOUNT} component={MyAccount} />

          {/* <Route render={() => <h5>Not Found 404</h5>} /> */}
        </Switch>
      </Main>
      {/*Want <SlidMod> to be reusable. Using context within it doesn't allow me to*/}
      <SlidingModal
        showModal={!!dataURL}
        closeModal={resetForm}
        modalHeading="Create Your Post!">
        {!file ? <CreatePost /> : <Progress />}
      </SlidingModal>
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
