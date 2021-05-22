import React, { useContext, useEffect, useState } from 'react';
import useDb from '../../../../custom-hooks/useDb';
import authContext from '../../../../contexts/auth/authContext';
import SlidingModal from '../../SlidingModal';
import PostForm from '../../PostForm';
import { Save } from '@material-ui/icons';
import { Box } from '@material-ui/core';
import UpdatePost from './UpdatePost';

const CameraRoll = () => {
  const { currentUser } = useContext(authContext);
  const imageDocs = useDb('Image URL Data');
  const [usersImageDocs, setUsersImageDocs] = useState([]);

  const [modalImageDoc, setModalImageDoc] = useState(null);

  useEffect(() => {
    setUsersImageDocs(
      imageDocs.filter((doc) => doc.userId === currentUser.uid)
    );
  }, [imageDocs]);

  return (
    <>
      {usersImageDocs.length ? (
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
      ) : (
        <h3>Your Camera Roll is currently empty.</h3>
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
