import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { authContext } from '../contexts/1.auth/authContext';

const PublicRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(authContext);

  return (
    <Route
      {...rest}
      render={() => (!user ? <Component {...rest} /> : <Redirect to="/" />)}
    />
  );
};

export default PublicRoute;
