import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  form: {
    maxWidth: '30rem',
  },
  textField: {
    marginBottom: '16px',
    display: 'block',
    '&:first-child': {
      marginTop: 30,
    },
  },
}));
