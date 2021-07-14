import { useMemo, useState } from 'react';

import { useDispatch } from 'react-redux';
import { removeSnackbar, setIsSubmitting } from '../../state/app/actions';
import { useHistory, useParams } from 'react-router-dom';
import { usePostsCollection } from '../../custom-hooks';

import { profileContext } from './profileContext';

const idxToTabName = {
  public: 0,
  private: 1,
  all: 2,
};
const tabNameToIdx = {
  0: 'public',
  1: 'private',
  2: 'all',
};

const ProfileProvider = ({ children }) => {
  const { push } = useHistory();
  const { username, tabName } = useParams();

  const dispatch = useDispatch();

  //For both user's and altUser's pages:
  const [posts, setPosts] = usePostsCollection(username);

  //For only user's page:
  const [selectedTab, setSelectedTab] = useState(idxToTabName[tabName]);

  const tabChangeHandler = (e, tabIdx) => {
    push(`/p/${username}/${tabNameToIdx[tabIdx]}`);
    setSelectedTab(tabIdx);
  };

  const tabbedPosts = useMemo(() => {
    if (!posts.length) return [];

    switch (selectedTab) {
      case 0:
        return posts.filter((post) => !post.description.isPrivate);
      case 1:
        return posts.filter((post) => post.description.isPrivate);
      default:
        return posts;
    }
  }, [selectedTab, posts]);

  const [postToUpdate, setPostToUpdate] = useState(null);
  const gridClickHandler = (e) => {
    if (e.target === e.currentTarget) return;
    setPostToUpdate(tabbedPosts[e.target.dataset.postIdx]);
  };

  const resetPostToUpdate = () => {
    setPostToUpdate(null);
    dispatch(removeSnackbar());
    dispatch(setIsSubmitting(false));
  };

  return (
    <profileContext.Provider
      value={{
        posts,
        setPosts,
        noOfPosts: posts.length,
        selectedTab,
        tabChangeHandler,
        tabbedPosts,
        postToUpdate,
        resetPostToUpdate,
        gridClickHandler,
      }}>
      {children}
    </profileContext.Provider>
  );
};

export default ProfileProvider;
