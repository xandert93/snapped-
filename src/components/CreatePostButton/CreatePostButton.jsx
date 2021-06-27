import { useContext } from 'react';
import { Box, Fab, useMediaQuery } from '@material-ui/core';
import { AddAPhoto } from '@material-ui/icons';
import { uploadContext } from '../../contexts/2.upload/uploadContext';
import useStyles from './styles';

export default function CreatePostButton() {
  const isVPxs = useMediaQuery(({ breakpoints }) => breakpoints.down('xs')); //is viewport width less than 960px
  const classes = useStyles({ isVPxs });

  const { fileData, validateFile } = useContext(uploadContext);

  return (
    <Box className={classes.root}>
      <Fab color="secondary" className={classes.fab}>
        <input
          className={classes.fileInput}
          type="file"
          id="file-input"
          value={fileData.path}
          onChange={(e) => validateFile(e.target.files[0])}
        />
        <label htmlFor="file-input" className={classes.fileInputLabel} />
        <AddAPhoto className={classes.addPhotoIcon} />
      </Fab>
    </Box>
  );
}
