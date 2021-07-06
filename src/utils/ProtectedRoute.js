import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { authContext } from '../contexts/1.auth/authContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(authContext);

  return (
    <Route
      {...rest}
      render={() =>
        user ? <Component {...rest} /> : <Redirect to="/auth/login" />
      }
    />
  );
};

export default ProtectedRoute;
