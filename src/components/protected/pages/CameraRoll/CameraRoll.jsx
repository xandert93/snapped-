import React, { useContext, useState } from 'react';
import { usePostsColl } from '../../../../custom-hooks';
import authContext from '../../../../contexts/auth/authContext';
import SlidingModal from '../../SlidingModal';
import { Lock, PhotoLibrary, Public, Save } from '@material-ui/icons';
import { AppBar, Box, Tab, Tabs } from '@material-ui/core';
import UpdatePost from './UpdatePost';
import { useParams, useHistory } from 'react-router-dom';
import { useSetDocumentTitle } from '../../../../custom-hooks';

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

const CameraRoll = () => {
  useSetDocumentTitle('Camera Roll');
  const { currentUserDoc } = useContext(authContext);
  const { tabName } = useParams();
  const { push } = useHistory();

  const [selectedTab, setSelectedTab] = useState(idxToTabName[tabName]);

  const [usersPosts, numOfPosts] = usePostsColl(currentUserDoc.username);

  const tabChangeHandler = (e, tabIdx) => {
    push(`/camera-roll/${tabNameToIdx[tabIdx]}`);
    setSelectedTab(tabIdx);
  };

  const [modalPost, setModalPost] = useState(null);

  return (
    <>
      <Box>
        I am following:
        {currentUserDoc.following.map((otherUserId) => (
          <p>{otherUserId}</p>
        ))}
        My followers:
        {currentUserDoc.followers.map((otherUserId) => (
          <p>{otherUserId}</p>
        ))}
      </Box>
      <AppBar position="static" color="inherit">
        <Tabs
          textColor="secondary"
          variant="fullWidth"
          value={selectedTab}
          onChange={tabChangeHandler}>
          <Tab icon={<Public />} disabled={false} />
          <Tab icon={<Lock />} disabled={false} />
          <Tab icon={<PhotoLibrary />} />
        </Tabs>
      </AppBar>

      {selectedTab === 0 && (
        <Box
          className="camera-roll"
          onClick={(e) => {
            if (e.target === e.currentTarget) return;
            setModalPost(usersPosts[e.target.dataset.index]);
          }}>
          {usersPosts.map(({ description, id, url }, idx) => {
            if (!description.isPrivate)
              return <img key={id} src={url} data-index={idx} alt="" />;
          })}
        </Box>
      )}
      {selectedTab === 1 && (
        <Box
          className="camera-roll"
          onClick={(e) => {
            if (e.target === e.currentTarget) return;
            setModalPost(usersPosts[e.target.dataset.index]);
          }}>
          {usersPosts.map(({ description, id, url }, idx) => {
            if (description.isPrivate)
              return <img key={id} src={url} data-index={idx} alt="" />;
          })}
        </Box>
      )}
      {selectedTab === 2 && (
        <Box
          className="camera-roll"
          onClick={(e) => {
            if (e.target === e.currentTarget) return;
            setModalPost(usersPosts[e.target.dataset.index]);
          }}>
          {usersPosts.map(({ id, url }, idx) => (
            <img key={id} src={url} data-index={idx} alt="" />
          ))}
        </Box>
      )}

      <SlidingModal
        {...{
          showModal: !!modalPost,
          closeModal: () => setModalPost(null),
          modalHeading: 'Edit Your Post!',
        }}>
        {modalPost && (
          <UpdatePost
            {...{
              type: 'update',
              imageURL: modalPost.url,
              doc: modalPost,
              submitIcon: <Save color="primary" />,
              closeModal: () => setModalPost(null),
            }}
          />
        )}
      </SlidingModal>
    </>
  );
};

export default CameraRoll;
