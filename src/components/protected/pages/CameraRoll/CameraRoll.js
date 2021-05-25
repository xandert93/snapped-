import React, { useContext, useState } from 'react';
import useDb from '../../../../custom-hooks/useDb';
import authContext from '../../../../contexts/auth/authContext';
import SlidingModal from '../../SlidingModal';
import { Save } from '@material-ui/icons';
import { Box, Button } from '@material-ui/core';
import UpdatePost from './UpdatePost';

const CameraRoll = () => {
  const { currentUser } = useContext(authContext);

  const [numOfRequestedDocs, setNumOfRequestedDocs] = useState(1);

  const [usersImageDocs, numOfAvailableDocs] = useDb(
    'Image URL Data',
    numOfRequestedDocs,
    currentUser.uid
  );

  const [modalImageDoc, setModalImageDoc] = useState(null);

  const noMoreImageDocs = numOfRequestedDocs === numOfAvailableDocs;
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

      {usersImageDocs.length > 0 && (
        <Box style={{ textAlign: 'center' }}>
          <Button
            disabled={noMoreImageDocs}
            variant="contained"
            color="secondary"
            onClick={() => setNumOfRequestedDocs((x) => x + 1)}>
            Fetch One More
          </Button>
          <Button
            disabled={noMoreImageDocs}
            variant="contained"
            color="secondary"
            onClick={() => setNumOfRequestedDocs(numOfAvailableDocs)}>
            Fetch All (~{numOfAvailableDocs * 3.5}MB?)
          </Button>
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
