import React, { useContext, useEffect, useState } from 'react';
import useDb from '../../../../custom-hooks/useDb';
import authContext from '../../../../contexts/auth/authContext';
import UpdatePostModal from './UpdatePostModal.jsx';

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
      {usersImgDocs.length ? (
        <div
          className="camera-roll"
          onClick={(e) => {
            if (e.target == e.currentTarget) return;
            setModalImgDoc(usersImgDocs[e.target.dataset.index]);
            setShowModal(true);
          }}>
          {usersImgDocs.map((userImgDoc, idx) => (
            <img
              key={userImgDoc.id}
              src={userImgDoc.url}
              data-index={idx}
              alt=""
            />
          ))}
        </div>
      ) : (
        <h3>Your Camera Roll is currently empty.</h3>
      )}

      {showModal && (
        <UpdatePostModal {...{ showModal, setShowModal, modalImgDoc }} />
      )}
    </>
  );
};

export default CameraRoll;
