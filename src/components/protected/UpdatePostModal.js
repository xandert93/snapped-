import React, { useRef } from 'react';
import { db } from '../../firebase/config';

const UpdatePostModal = ({ setShowModal, modalImgDoc }) => {
  const submitHandler = (e) => {
    e.preventDefault();
  };

  const locationRef = useRef();
  const dateRef = useRef();
  const descriptionRef = useRef();

  const deletePost = async (e) => {
    setShowModal(false);
    try {
      await db.collection('Image URL Data').doc(modalImgDoc.id).delete();
    } catch (err) {}
  };

  const updatePost = async (e) => {
    e.preventDefault();
    const location = locationRef.current.value,
      date = dateRef.current.value,
      description = descriptionRef.current.value;

    console.log(location, date, description);

    try {
      await db.collection('Image URL Data').doc(modalImgDoc.id).set(
        {
          description: { location, date, description },
        },
        { merge: true }
      );
      setShowModal(false);
    } catch (err) {}
  };

  return (
    <div
      className="modal"
      onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
    >
      <div className="modal-body">
        <button onClick={deletePost}>Delete post</button>
        <form onSubmit={submitHandler}>
          <label htmlFor="location">Location:</label>
          <input
            ref={locationRef}
            name="location"
            id="location"
            defaultValue={modalImgDoc.description.location}
          />
          <div className="image-preview">
            <img className="img" src={modalImgDoc.url} />
          </div>
          <div>
            <label htmlFor="date">Date:</label>
            <input
              ref={dateRef}
              name="date"
              id="date"
              defaultValue={modalImgDoc.description.date}
            />
            <p>enter description:</p>
            <textarea
              ref={descriptionRef}
              defaultValue={modalImgDoc.description.description}
              required
            ></textarea>
          </div>
          <button onClick={updatePost}>Update post</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePostModal;
