import React, { useContext, useState } from 'react';
import { usePostsColl } from '../../../../custom-hooks';
import authContext from '../../../../contexts/auth/authContext';
import SlidingModal from '../../SlidingModal';
import { Lock, PhotoLibrary, Public, Save } from '@material-ui/icons';
import { AppBar, Box, Grid, Tab, Tabs, Typography } from '@material-ui/core';
import UpdatePost from './UpdatePost';
import { useParams, useHistory } from 'react-router-dom';
import { useSetDocumentTitle } from '../../../../custom-hooks';
import useStyles from './styles.js';

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
  const classes = useStyles();
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

  const postsCondition =
    usersPosts.length && selectedTab === 0
      ? [false]
      : selectedTab === 1
      ? [true]
      : [true, false];

  const shownPosts = usersPosts?.filter(({ description: { isPrivate } }) =>
    postsCondition.includes(isPrivate)
  );

  return (
    <>
      <Box>
        <Typography>I am following:</Typography>
        {currentUserDoc.following.map((username) => (
          <Typography variant="caption">{username}, </Typography>
        ))}
        <Typography>My followers:</Typography>
        {currentUserDoc.followers.map((username) => (
          <Typography variant="caption">{username}, </Typography>
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

      <Grid
        container
        spacing={1}
        onClick={(e) => {
          if (e.target === e.currentTarget) return;
          setModalPost(shownPosts[e.target.dataset.index]);
        }}>
        {shownPosts.map(({ id, url }, idx) => (
          <Grid key={id} item xs={4} md={3}>
            <Box className={classes.imageBox}>
              <img
                src={url}
                data-index={idx}
                alt={`${currentUserDoc.username}'s post`}
                className={classes.image}
              />
            </Box>
          </Grid>
        ))}
      </Grid>

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
