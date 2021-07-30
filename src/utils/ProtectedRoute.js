import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from '../constants/routes';

export default function ProtectedRoute({ component: Component, ...rest }) {
  const user = useSelector((state) => state.auth.user);
  //using FB auth user cause infinite re-renders on logout, for some reason...

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (user) {
          if (rest.path !== ROUTES.ALT_PROFILE) return <Component {...rest} />;
          else return <Component {...rest} key={routeProps.location.key} />;
        } else return <Redirect to="/auth/login" />;
      }}
    />
  );
}
