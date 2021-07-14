import { useContext } from 'react';
import { Box, Fab, useMediaQuery, Zoom } from '@material-ui/core';
import { AddAPhoto } from '@material-ui/icons';
import { uploadContext } from '../../contexts/2.upload/uploadContext';
import useStyles from './styles';
import { checkFile } from '../../state/upload/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function CreatePostFAB({ isScrolledDown }) {
  const isVPxs = useMediaQuery(({ breakpoints }) => breakpoints.down('xs'));
  const isVPsm = useMediaQuery(({ breakpoints }) => breakpoints.down('sm'));
  const classes = useStyles({ isVPxs, isVPsm });

  const reader = useContext(uploadContext);

  const dispatch = useDispatch();
  const { path } = useSelector((state) => state.upload.fileData);

  return (
    <Zoom in={!isScrolledDown} timeout={500}>
      <Box className={classes.root + ' mui-fixed'}>
        <Fab color="secondary" className={classes.fab}>
          <input
            // className={classes.fileInput}
            type="file"
            accept="image/*"
            id="file-input"
            value={path}
            onChange={(e) => dispatch(checkFile(e.target.files[0], reader))}
            hidden
          />
          <label htmlFor="file-input" className={classes.fileInputLabel} />
          <AddAPhoto className={classes.addPhotoIcon} />
        </Fab>
      </Box>
    </Zoom>
  );
}
