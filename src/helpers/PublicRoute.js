import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import authContext from '../contexts/auth/authContext';

const PublicRoute = ({ component: Component, ...rest }) => {
  const { currentUserDoc } = useContext(authContext);

  return (
    <Route
      {...rest}
      render={() =>
        !currentUserDoc ? <Component {...rest} /> : <Redirect to="/" />
      }
    />
  );
};

export default PublicRoute;
