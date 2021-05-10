import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import authContext from '../../contexts/auth/authContext';

const PublicRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useContext(authContext);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !currentUser ? <Component {...routeProps} /> : <Redirect to="/" />
      }
    />
  );
};

export default PublicRoute;
