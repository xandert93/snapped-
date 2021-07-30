import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  cardActions: {
    justifyContent: 'space-evenly',
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    '& div': {
      flex: 1,
      textAlign: 'center',

      '&:not(:first-child)': {
        marginLeft: 0,
      },
      '&:not(:last-child)': {
        borderRight: '2px solid',
      },
    },
  },

  commentSVG: {
    paddingTop: 1,
  },
}));
