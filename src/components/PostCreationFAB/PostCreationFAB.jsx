import { Box, Fab, useMediaQuery, Zoom } from '@material-ui/core';
import { AddAPhoto } from '@material-ui/icons';
import useStyles from './styles';
import { setSelectedFile } from '../../state/upload/actions';
import { useDispatch } from 'react-redux';
import { isFileImage, isFileSizeSmall } from '../../utils/helpers';
import { setFailureSnackbar } from '../../state/app/actions';

export default function PostCreationFAB({ reader, isScrolledDown }) {
  const isVPxs = useMediaQuery(({ breakpoints }) => breakpoints.down('xs'));
  const isVPsm = useMediaQuery(({ breakpoints }) => breakpoints.down('sm'));
  const classes = useStyles({ isVPxs, isVPsm });

  const dispatch = useDispatch();

  const fileChangeHandler = (e) => {
    let pickedFile = e.target.files[0];
    if (pickedFile) {
      if (!isFileImage(pickedFile)) {
        return dispatch(
          setFailureSnackbar('Please choose an image file (.png or .jpeg)')
        );
      }
      if (!isFileSizeSmall(pickedFile)) {
        return dispatch(
          setFailureSnackbar('Please select an image smaller than 6MB.')
        );
      } else {
        dispatch(setSelectedFile(pickedFile));
        reader.readAsDataURL(pickedFile);
      }
    }
  };

  return (
    <Zoom in={!isScrolledDown} timeout={500}>
      <Box className={classes.root + ' mui-fixed'}>
        <Fab color="secondary" className={classes.fab}>
          <input
            // className={classes.fileInput}
            type="file"
            accept="image/*"
            id="file-input"
            value="" //*
            onChange={fileChangeHandler}
            hidden
          />
          <label htmlFor="file-input" className={classes.fileInputLabel} />
          <AddAPhoto className={classes.addPhotoIcon} />
        </Fab>
      </Box>
    </Zoom>
  );
}

/* *hack - enables clean value after every file selection. Useful if user tries
to select the same file again. Otherwise, onChange would not run again, 
causing unexpected behaviour. */
