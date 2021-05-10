import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import authContext from '../../contexts/auth/authContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useContext(authContext);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        currentUser ? (
          <Component {...routeProps} />
        ) : (
          <Redirect to="/auth/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
