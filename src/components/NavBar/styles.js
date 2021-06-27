import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  appBar: {
    borderBottom: `3px solid ${theme.palette.primary.main}`,
  },

  toolbar: {
    justifyContent: 'space-between',
  },

  heading: ({ isVPsm }) =>
    isVPsm && {
      display: 'none',
    },

  headingButtonBox: ({ isVPsm }) => ({
    // order: isVPsm ? 1 : 'initial',
    '& h1': {
      textTransform: 'lowercase',
    },
  }),

  logoImg: ({ isVPsm }) => ({
    width: theme.spacing(isVPsm ? 7 : 8),
    margin: '-5px 0 -6px', //just to crop it on top and bottom
    marginRight: theme.spacing(isVPsm ? 0 : 2),
  }),

  grow: {
    flexGrow: 1,
  },

  themeSwitchBox: ({ isVPsm }) => ({
    order: isVPsm ? 2 : 'initial',
  }),

  avatar: {
    height: theme.spacing(4.2),
    width: theme.spacing(4.2),
  },

  notificationButton: {
    '& .MuiBadge-anchorOriginTopRightRectangle': {
      transform: 'scale(1) translate(20%, -20%)',
    },
  },
}));
