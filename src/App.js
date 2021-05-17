import { Switch } from 'react-router-dom';
import './App.scss';
import Auth from './components/public/Auth/Auth';
import ProtectedRoute from './components/public/ProtectedRoute';
import PublicRoute from './components/public/PublicRoute';
import CameraRoll from './components/protected/CameraRoll';
import ImageGrid from './components/protected/ImageGrid/ImageGrid';
import MyAccount from './components/protected/MyAccount';
import Navbar from './components/protected/Navbar/Navbar';
import { useContext, useEffect, useState } from 'react';
import authContext from './contexts/auth/authContext';

const App = () => {
  const { currentUser } = useContext(authContext);
  const [innerWidth, setInnerWidth] = useState(0);

  useEffect(() => {
    setInnerWidth(window.innerWidth);
    window.onresize = () => setInnerWidth(window.innerWidth);
  }, []);

  return (
    <>
      {currentUser && <Navbar innerWidth={innerWidth} />}
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          innerWidth={innerWidth}
          component={ImageGrid}
        />
        <ProtectedRoute path="/camera-roll" component={CameraRoll} />
        <ProtectedRoute path="/my-account" component={MyAccount} />

        <PublicRoute path="/auth/:userAction" component={Auth} />
        {/* <Route render={() => <h5>Not Found 404</h5>} /> */}
      </Switch>
    </>
  );
};

export default App;
