import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  appBar: {
    borderBottom: `3px solid ${theme.palette.primary.main}`,
    transition: theme.transitions.create('top', { duration: '0.3s' }),
  },

  toolbar: {
    justifyContent: 'space-between',
  },

  headingButtonBox: ({ isVPsm }) => ({
    order: isVPsm ? 1 : 'initial',
    '& h1': {
      textTransform: 'lowercase',
    },
  }),

  themeSwitchBox: ({ isVPsm }) => ({
    order: isVPsm ? 2 : 'initial',
    flexGrow: !isVPsm ? 1 : 'initial',
  }),

  logoImg: ({ isVPsm }) => ({
    width: theme.spacing(isVPsm ? 7 : 8),
    margin: '-6px 0', //just to crop it on top and bottom
    marginRight: theme.spacing(isVPsm ? 0 : 2),
  }),
}));
