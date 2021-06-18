import React, { useContext, useState } from 'react';
import { AddToPhotos } from '@material-ui/icons';
import useStyles from './styles';
import { authContext } from '../../../contexts/1.auth/authContext';
import { uploadContext } from '../../../contexts/2.upload/uploadContext';

const Main = ({ children }) => {
  const classes = useStyles();
  const { currentUserDoc } = useContext(authContext);
  const { validateFile } = useContext(uploadContext);

  const [isDragged, setIsDragged] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragged(true);
  };

  const handleDragLeave = (e) => {
    if (e.target !== e.currentTarget) return;
    setIsDragged(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragged(false);
    validateFile(e.dataTransfer.files[0]);
  };

  return !currentUserDoc ? (
    <main>{children}</main>
  ) : (
    <>
      <main
        className={`${classes.main} ${isDragged ? classes.dragged : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onDragEnd={() => setIsDragged(false)}>
        <div className={classes[!isDragged ? 'container' : 'containerHidden']}>
          {children}
        </div>
      </main>

      {isDragged && (
        <AddToPhotos className={classes.uploadIcon} color="secondary" />
      )}
    </>
  );
};

export default Main;