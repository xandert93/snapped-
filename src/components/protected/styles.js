import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,

  form: {
    padding: theme.spacing(2),
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
  },
  imageBox: { textAlign: 'center' },
  image: { maxWidth: '70vw', maxHeight: '70vh', borderRadius: '3px' },
}));
