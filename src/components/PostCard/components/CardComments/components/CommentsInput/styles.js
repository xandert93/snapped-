import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  commentsInput: {
    width: '100%',
    fontSize: 16,

    '& .MuiInputAdornment-root': {
      paddingBottom: 5,
      paddingLeft: 5,
    },
  },
}));
