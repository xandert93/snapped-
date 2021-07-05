import { fade, makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  //sort out box-shadow
  appBar: {
    background: fade(theme.palette.background.paper, 0.2),
  },
}));
