import { usePostsCollection, useSetDocumentTitle } from '../../custom-hooks';
import { Redirect, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { UserHeader, UserImageGrid, AltUserHeader, AltImageGrid } from './components';
import { Container } from '@material-ui/core';
import { selectUserUsername } from '../../state/auth/selectors';

export default function Profile() {
  const { username } = useParams();
  let _username = username.toLowerCase();
  const { url, path } = useRouteMatch();

  useSetDocumentTitle(_username);

  const userUsername = useSelector(selectUserUsername);
  const isUsersProfile = userUsername === _username;

  usePostsCollection();

  return (
    <Container maxWidth="xl" disableGutters>
      {isUsersProfile ? (
        <>
          <UserHeader />
          <Switch>
            <Redirect exact from={url} to={url + '/public'} />
            <Route exact path={path + '/:tabName'} component={UserImageGrid} />
          </Switch>
        </>
      ) : (
        <>
          <AltUserHeader />
          <AltImageGrid />
        </>
      )}
    </Container>
  );
}
