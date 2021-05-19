import { Button } from '@material-ui/core';
import { Publish } from '@material-ui/icons';
import React, { useRef, useState } from 'react';
import ProgressBar from './ProgressBar';

const UploadForm = ({ dataURL, fileInfo, file, setFile, resetForm }) => {
  const locationRef = useRef();
  const captionRef = useRef();

  const [description, setDescription] = useState(null);

  const createPost = (e) => {
    e.preventDefault();
    const location = locationRef.current.value,
      caption = captionRef.current.value;

    setFile(fileInfo.file);
    setDescription({ location, date: 'dw', description: caption });
  };

  return (
    <div className="modal">
      <div className="modal-body">
        {!file && (
          <form onSubmit={createPost}>
            <label htmlFor="location">Location:</label>
            <input ref={locationRef} name="location" id="location" required />
            <div className="image-preview">
              <img className="img" src={dataURL} alt="Image Preview" />
            </div>
            <div>
              <p>enter description:</p>
              <textarea ref={captionRef} required></textarea>
            </div>

            <Button
              type="submit"
              variant="contained"
              endIcon={<Publish color="primary" />}>
              Publish
            </Button>
          </form>
        )}
        {file && <ProgressBar {...{ file, description, resetForm }} />}
      </div>
    </div>
  );
};

export default UploadForm;
