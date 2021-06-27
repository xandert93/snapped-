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
  const { setMsgData, setIsSubmitting } = useContext(appContext);

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
    if (selectedTab === 0) {
      return posts.filter((post) => !post.description.isPrivate);
    }
    if (selectedTab === 1) {
      return posts.filter((post) => post.description.isPrivate);
    }
    if (selectedTab === 2) return posts; //all posts
  }, [selectedTab, posts]);

  const [modalPost, setModalPost] = useState(null);
  const gridClickHandler = (e) => {
    if (e.target === e.currentTarget) return;
    setModalPost(tabbedPosts[e.target.dataset.postIdx]);
  };

  const resetModalPost = () => {
    setModalPost(null);
    setMsgData(null);
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
        modalPost,
        resetModalPost,
        gridClickHandler,
      }}>
      {children}
    </profileContext.Provider>
  );
};

export default ProfileProvider;