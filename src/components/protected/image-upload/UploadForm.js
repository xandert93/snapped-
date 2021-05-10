import React, { useEffect, useRef, useState } from 'react';
import FileError from './FileError';
import UploadModal from './UploadModal';
import ProgressBar from './ProgressBar';

const UploadForm = () => {
  const [fileErrMsg, setFileErrMsg] = useState('');
  const [file, setFile] = useState(null);
  const [fileInfo, setFileInfo] = useState({ file: null, path: '' });
  const [dataURL, setDataURL] = useState('');

  const [imgDescription, setImgDescription] = useState('');
  const [isDragged, setIsDragged] = useState(false);
  const readerRef = useRef(new FileReader());

  const fileInputRef = useRef();
  const textareaRef = useRef();

  useEffect(() => {
    readerRef.current.onload = (e) => setDataURL(e.target.result);
  }, []);

  const validateFile = (selectedFile) => {
    if (selectedFile) {
      if (['image/png', 'image/jpeg'].includes(selectedFile.type)) {
        setFileErrMsg('');
        setFileInfo({ file: selectedFile });
        readerRef.current.readAsDataURL(selectedFile);
        return;
      } else {
        setFileErrMsg('Please choose an image file (.png or .jpeg)');
        return;
      }
    } else {
      setFileErrMsg('');
      setFileInfo({ file: null, path: '' });
      return;
    }
  };

  const resetForm = () => {
    setFileInfo({ file: null, path: '' });
    setFile(null);
    setDataURL('');
  };

  return (
    <>
      <form>
        {!file && (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragged(true);
            }}
            onDragLeave={() => setIsDragged(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragged(false);
              validateFile(e.dataTransfer.files[0]);
            }}
            style={{
              textAlign: 'center',
              margin: 15,
              background: 'pink',
              borderRadius: 5,
              border: `5px solid ${isDragged ? 'green' : 'red'}`,
            }}
          >
            <input
              type="file"
              id="file-input"
              ref={fileInputRef}
              value={fileInfo.path}
              onChange={(e) => validateFile(e.target.files[0])}
            />{' '}
            <label htmlFor="file-input">Click/Drag image here to upload</label>
          </div>
        )}
        {fileErrMsg && <FileError fileErrMsg={fileErrMsg} />}
        {file && (
          <ProgressBar
            file={file}
            imgDescription={imgDescription}
            resetForm={resetForm}
          />
        )}
      </form>
      {dataURL && !file && (
        <UploadModal
          dataURL={dataURL}
          resetForm={resetForm}
          fileInfo={fileInfo}
          setFile={setFile}
          textareaRef={textareaRef}
          setImgDescription={setImgDescription}
        />
      )}
    </>
  );
};
export default UploadForm;
