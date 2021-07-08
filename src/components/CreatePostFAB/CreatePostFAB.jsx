import { useContext } from 'react';
import { Box, Fab, useMediaQuery, Zoom } from '@material-ui/core';
import { AddAPhoto } from '@material-ui/icons';
import { uploadContext } from '../../contexts/2.upload/uploadContext';
import useStyles from './styles';

export default function CreatePostFAB({ isScrolledDown }) {
  const isVPxs = useMediaQuery(({ breakpoints }) => breakpoints.down('xs'));
  const isVPsm = useMediaQuery(({ breakpoints }) => breakpoints.down('sm'));
  const classes = useStyles({ isVPxs, isVPsm });

  const { fileData, validateFile } = useContext(uploadContext);

  return (
    <Zoom in={!isScrolledDown} timeout={500}>
      <Box className={classes.root + ' mui-fixed'}>
        <Fab color="secondary" className={classes.fab}>
          <input
            // className={classes.fileInput}
            type="file"
            accept="image/*"
            id="file-input"
            value={fileData.path}
            onChange={(e) => validateFile(e.target.files[0])}
            hidden
          />
          <label htmlFor="file-input" className={classes.fileInputLabel} />
          <AddAPhoto className={classes.addPhotoIcon} />
        </Fab>
      </Box>
    </Zoom>
  );
}
