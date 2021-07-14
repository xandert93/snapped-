import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelector } from '../state/selectors';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(userSelector);

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
