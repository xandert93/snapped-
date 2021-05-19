import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  logoImg: {
    width: 50,
    marginRight: 12,
  },
  heading: {
    textTransform: 'lowercase',
  },
  grow: {
    flexGrow: 1,
  },

  navButtons: {
    '& > *': { fontSize: '1.1rem' },

    '& > :not(:last-child)': {
      marginRight: 12,
    },
    '& > :last-child': {
      marginLeft: 12,
      marginRight: 10,
    },
  },
  navButtonsMob: {
    display: 'flex',
    flexDirection: 'column',
    '& > *:not(hr)': {
      padding: theme.spacing(4),
      paddingRight: theme.spacing(5),
    },
  },
}));