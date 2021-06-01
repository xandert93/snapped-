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

  const [usersImageDocs, numOfAvailableDocs] = usePostsColl(
    currentUserDoc.username
  );

  const tabChangeHandler = (e, tabIdx) => {
    push(`/camera-roll/${tabNameToIdx[tabIdx]}`);
    setSelectedTab(tabIdx);
  };

  const [modalImageDoc, setModalImageDoc] = useState(null);

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
            setModalImageDoc(usersImageDocs[e.target.dataset.index]);
          }}>
          {usersImageDocs.map(({ description, id, url }, idx) => {
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
            setModalImageDoc(usersImageDocs[e.target.dataset.index]);
          }}>
          {usersImageDocs.map(({ description, id, url }, idx) => {
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
            setModalImageDoc(usersImageDocs[e.target.dataset.index]);
          }}>
          {usersImageDocs.map(({ id, url }, idx) => (
            <img key={id} src={url} data-index={idx} alt="" />
          ))}
        </Box>
      )}

      <SlidingModal
        {...{
          showModal: !!modalImageDoc,
          closeModal: () => setModalImageDoc(null),
          modalHeading: 'Edit Your Post!',
        }}>
        {modalImageDoc && (
          <UpdatePost
            {...{
              type: 'update',
              imageURL: modalImageDoc.url,
              doc: modalImageDoc,
              submitIcon: <Save color="primary" />,
              closeModal: () => setModalImageDoc(null),
            }}
          />
        )}
      </SlidingModal>
    </>
  );
};

export default CameraRoll;
