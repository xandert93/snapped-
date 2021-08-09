import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ component: Component, ...rest }) {
  const user = useSelector((state) => state.auth.user);
  //using FB auth user cause infinite re-renders on logout, for some reason...

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        let paramsUsername = routeProps.match.params?.username;
        if (user) {
          if (paramsUsername) return <Component key={paramsUsername} />;
          else return <Component />;
        } else return <Redirect to="/auth/login" />;
      }}
    />
  );
}

//in this case, the rest object i.e. {exact: Bool, path: Str}, is only needed for the <Route/> itself.
//whilst it is not needed for the <Component/> to be rendered, just in case we ever *do* pass anything into <ProtectedRoute>
//that we want to be passed into the <Component/>, we may often see it passed it in too
