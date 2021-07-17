import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ImageGrid } from '../../../../components';
import { setPostToEdit } from '../../../../state/posts/actions';
import { ImageTabs } from '../ImageTabs';

export default function UserImageGrid() {
  const dispatch = useDispatch();
  const userPosts = useSelector((state) => state.posts.user);

  const { tabName } = useParams();

  const tabbedPosts = useMemo(() => {
    if (!userPosts.length) return [];

    switch (tabName) {
      case 'public':
        return userPosts.filter((post) => !post.description.isPrivate);
      case 'private':
        return userPosts.filter((post) => post.description.isPrivate);
      case 'all':
        return userPosts;
      default:
        return [];
    }
  }, [tabName, userPosts]);

  const userImageClickHandler = (idx) => {
    //don't think I want this long term;broken at moment anyway -
    // dispatch(setPostToEdit(idx))
  };

  return <ImageGrid posts={tabbedPosts} clickHandler={userImageClickHandler} />;
}
