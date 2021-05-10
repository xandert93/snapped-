import React, { useContext, useEffect, useState } from 'react';
import useDb from '../../custom-hooks/useDb';
import authContext from '../../contexts/auth/authContext';
import UpdatePostModal from './UpdatePostModal';
import UploadForm from './image-upload/UploadForm';

const CameraRoll = () => {
  const { currentUser } = useContext(authContext);
  const imgDocs = useDb('Image URL Data');
  const [usersImgDocs, setUsersImgDocs] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalImgDoc, setModalImgDoc] = useState(null);

  useEffect(() => {
    setUsersImgDocs(
      imgDocs.filter((imgDoc) => imgDoc.userId === currentUser.uid)
    );
  }, [imgDocs]);

  return (
    <>
      <UploadForm />
      <h3 style={{ color: 'orange' }}>
        click on your pics to update or delete them
      </h3>
      <div
        className="camera-roll"
        onClick={(e) => {
          if (e.target !== e.currentTarget) {
            setModalImgDoc(usersImgDocs[e.target.dataset.index]);
            setShowModal(true);
          }
        }}
      >
        {usersImgDocs.map((userImgDoc, idx) => (
          <img key={userImgDoc.id} src={userImgDoc.url} data-index={idx} />
        ))}
      </div>
      {showModal && (
        <UpdatePostModal {...{ setShowModal, modalImgDoc, setModalImgDoc }} />
      )}
    </>
  );
};

export default CameraRoll;
