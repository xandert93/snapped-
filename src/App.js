import { Switch } from 'react-router-dom';
import './App.scss';
import Header from './components/layout/Header';
import { Login, Register, PasswordReset } from './components/public';
import ProtectedRoute from './components/public/ProtectedRoute';
import PublicRoute from './components/public/PublicRoute';
import CameraRoll from './components/protected/CameraRoll';
import { useContext } from 'react';
import authContext from './contexts/auth/authContext';
import Images from './components/protected/Images';
import MyAccount from './components/protected/MyAccount';
import Navbar from './components/protected/Navbar';

const App = () => {
  const { currentUser } = useContext(authContext);

  return (
    <>
      <Header />
      {currentUser && <Navbar />}
      <Switch>
        <ProtectedRoute exact path="/" component={Images} />
        <ProtectedRoute path="/camera-roll" component={CameraRoll} />
        <ProtectedRoute path="/my-account" component={MyAccount} />

        <PublicRoute path="/auth/register" component={Register} />
        <PublicRoute path="/auth/login" component={Login} />
        <PublicRoute path="/auth/password-reset" component={PasswordReset} />
        {/* <Route render={() => <h5>Not Found 404</h5>} /> */}
      </Switch>
    </>
  );
};

export default App;
