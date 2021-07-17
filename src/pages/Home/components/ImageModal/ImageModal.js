import { Box } from '@material-ui/core';

import useStyles from './styles';

const ImageModal = ({ closeDialog, url }) => {
  const classes = useStyles();

  return (
    <Box className={classes.modal} onClick={closeDialog}>
      <Box className={classes.modalBody}>
        <img className={classes.modalImg} src={url} alt="clicked image..." />
      </Box>
    </Box>
  );
};

export default ImageModal;
