import React, { useMemo, useState } from 'react';
import { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { usePostsCollection } from '../../custom-hooks';
import { appContext } from '../3.app/appContext';
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
  const { resetSnackbar, setIsSubmitting } = useContext(appContext);

  //For both user's and altUser's pages:
  const posts = usePostsCollection(username);

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

  const [postToEdit, setPostToEdit] = useState(null);
  const gridClickHandler = (e) => {
    if (e.target === e.currentTarget) return;
    setPostToEdit(tabbedPosts[e.target.dataset.postIdx]);
  };

  const resetPostToEdit = () => {
    setPostToEdit(null);
    resetSnackbar();
    setIsSubmitting(false);
  };

  return (
    <profileContext.Provider
      value={{
        posts,
        noOfPosts: posts.length,
        selectedTab,
        tabChangeHandler,
        tabbedPosts,
        postToEdit,
        resetPostToEdit,
        gridClickHandler,
      }}>
      {children}
    </profileContext.Provider>
  );
};

export default ProfileProvider;
