import React, { useRef } from 'react';

const UploadModal = ({
  dataURL,
  resetForm,
  fileInfo,
  setFile,
  setImgDescription,
}) => {
  const closeModal = (e) => e.target === e.currentTarget && resetForm();

  const locationRef = useRef();
  const dateRef = useRef();
  const descriptionRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const location = locationRef.current.value,
      date = dateRef.current.value,
      description = descriptionRef.current.value;

    setFile(fileInfo.file);
    setImgDescription({ location, date, description });
  };

  return (
    <div className="modal" onClick={closeModal}>
      <div className="modal-body">
        <form onSubmit={submitHandler}>
          <label htmlFor="location">Location:</label>
          <input ref={locationRef} name="location" id="location" required />
          <div className="image-preview">
            <img className="img" src={dataURL} />
          </div>
          <div>
            <label htmlFor="date">Date:</label>
            <input ref={dateRef} name="date" id="date" required />
            <p>enter description:</p>
            <textarea ref={descriptionRef} required></textarea>
          </div>
          <h5>
            Are you sure you want to upload {fileInfo.file.name}?
            <div>
              <button type="button" onClick={resetForm}>
                No
              </button>
              <button>Yes</button>
            </div>
          </h5>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
