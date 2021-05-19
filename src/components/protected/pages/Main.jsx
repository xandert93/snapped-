import React, { useState } from 'react';
import { AddToPhotos } from '@material-ui/icons';
import useStyles from './styles';

const Main = ({ validateFile, children }) => {
  const classes = useStyles();

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

  return (
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
