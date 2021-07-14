import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { userSelector } from '../state/selectors';

const PublicRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(userSelector);

  return (
    <Route
      {...rest}
      render={() => (!user ? <Component {...rest} /> : <Redirect to="/" />)}
    />
  );
};

export default PublicRoute;
