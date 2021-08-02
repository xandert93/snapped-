import { useState } from 'react';
import { Container, Toolbar, useMediaQuery } from '@material-ui/core';
import { AddToPhotos } from '@material-ui/icons';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../../../state/auth/selectors';
import { setSelectedFile } from '../../../../state/upload/actions';
import { isFileImage, isFileSizeSmall } from '../../../../utils/helpers';
import { setFailureSnackbar } from '../../../../state/app/actions';

export default function Main({ reader, children }) {
  const classes = useStyles();
  const isVPsm = useMediaQuery(({ breakpoints }) => breakpoints.down('sm'));

  const dispatch = useDispatch();
  const user = useSelector(userSelector);

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
    let droppedFile = e.dataTransfer.files[0];
    if (!isFileImage(droppedFile)) {
      return dispatch(
        setFailureSnackbar('Please choose an image file (.png or .jpeg)')
      );
    }
    if (!isFileSizeSmall(droppedFile)) {
      return dispatch(
        setFailureSnackbar('Please select an image smaller than 6MB.')
      );
    } else {
      dispatch(setSelectedFile(droppedFile));
      reader.readAsDataURL(droppedFile);
    }
  };

  return (
    <>
      <Container className={classes.root} component="main" maxWidth={false}>
        {children}
      </Container>
      {isVPsm && user && <Toolbar className={classes.bottomNavSpacer} />}
    </>
  );

  return !user ? (
    <Container component="main" maxWidth="xl">
      {children}
    </Container>
  ) : (
    <>
      <Container
        component="main"
        maxWidth={false}
        className={`${classes.main} ${isDragged ? classes.dragged : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onDragEnd={() => setIsDragged(false)}>
        <div className={classes[!isDragged ? 'container' : 'containerHidden']}>
          {children}
        </div>
      </Container>

      {isDragged && (
        <AddToPhotos className={classes.uploadIcon} color="secondary" />
      )}
    </>
  );
}