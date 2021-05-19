import React, { useContext, useEffect, useState } from 'react';
import useDb from '../../../../custom-hooks/useDb';
import authContext from '../../../../contexts/auth/authContext';
import SlidingModal from '../../SlidingModal';
import PostForm from '../../PostForm';
import { Save } from '@material-ui/icons';

const CameraRoll = () => {
  const { currentUser } = useContext(authContext);
  const imageDocs = useDb('Image URL Data');
  const [usersImageDocs, setUsersImageDocs] = useState([]);

  const [modalImageDoc, setModalImageDoc] = useState(null);

  useEffect(() => {
    setUsersImageDocs(
      imageDocs.filter((imgDoc) => imgDoc.userId === currentUser.uid)
    );
  }, [imageDocs]);

  return (
    <>
      {usersImageDocs.length ? (
        <div
          className="camera-roll"
          onClick={(e) => {
            if (e.target == e.currentTarget) return;
            setModalImageDoc(usersImageDocs[e.target.dataset.index]);
          }}>
          {usersImageDocs.map(({ id, url }, idx) => (
            <img key={id} src={url} data-index={idx} alt="" />
          ))}
        </div>
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
          <PostForm
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
