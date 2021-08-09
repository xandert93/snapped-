import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { selectUser } from '../state/auth/selectors';

export default function PublicRoute({ component: Component, ...rest }) {
  const user = useSelector(selectUser);

  return <Route {...rest} render={() => (!user ? <Component {...rest} /> : <Redirect to={ROUTES.HOME} />)} />;
}
