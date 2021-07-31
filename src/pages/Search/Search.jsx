import { Box } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { buildProfilePath, ROUTES } from '../../constants/routes';
import { useQuery, useSetDocumentTitle } from '../../custom-hooks';
import { fbGetAltUsersBySearch } from '../../services/firebase/firestore/users';
import { userUsernameSelector } from '../../state/auth/selectors';
import useStyles from './styles';
import { Link, PostCard } from '../../components';
import { db } from '../../lib/firebase/config';
import { fbGetPosts } from '../../services/firebase/firestore/posts';

export default function Search() {
  const classes = useStyles();
  const { search: queryString } = useLocation();
  const query = useQuery(queryString);
  const searchTerm = query.get('search_query');

  useSetDocumentTitle(`Search - ${searchTerm}`);

  const [altUsers, setAltUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  const userUsername = useSelector(userUsernameSelector);
  useEffect(() => {
    //filter users collection + posts collection

    fbGetAltUsersBySearch(searchTerm, userUsername).then(setAltUsers);

    const allPublicTagPostsRef = db
      .collection('Posts')
      .where('description.isPrivate', '==', false)
      .where('description.tags', 'array-contains', searchTerm);

    fbGetPosts(allPublicTagPostsRef, userUsername).then(setPosts);
  }, [searchTerm]);

  if (!searchTerm) return <Redirect to={ROUTES.EXPLORE} />;
  else
    return (
      <>
        <h1>Search</h1>
        {!!altUsers.length && (
          <Box>
            <h3>Users</h3>
            {altUsers.map(({ username }) => (
              <div key={username}>
                <Link to={buildProfilePath(username)}>{username}</Link>
              </div>
            ))}
          </Box>
        )}
        {!!posts.length && (
          <Box>
            <h3>Posts</h3>
            {posts.map((post, idx) => idx < 3 && <PostCard key={post.id} post={post} />)}
          </Box>
        )}
        {!!!altUsers.length && !!!posts.length && <h6>Diddly Squat found</h6>}
      </>
    );
}
