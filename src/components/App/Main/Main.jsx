import { useContext, useState } from 'react';
import { Container, Toolbar, useMediaQuery } from '@material-ui/core';
import { AddToPhotos } from '@material-ui/icons';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { uploadContext } from '../../../contexts/2.upload/uploadContext';
import { userSelector } from '../../../state/selectors';
import { checkInitialFile } from '../../../state/upload/actions';

export default function Main({ children }) {
  const classes = useStyles();
  const isVPsm = useMediaQuery(({ breakpoints }) => breakpoints.down('sm'));

  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  const reader = useContext(uploadContext);

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
    dispatch(checkInitialFile(e.dataTransfer.files[0], reader));
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
