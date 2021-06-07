import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  form: {
    padding: theme.spacing(2),
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
  },
  imageBox: { textAlign: 'center' },
  image: { maxWidth: '80vw', maxHeight: '60vh', borderRadius: '5px' },
}));
