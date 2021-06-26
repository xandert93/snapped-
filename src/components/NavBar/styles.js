import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  appBar: {
    borderBottom: `3px solid ${theme.palette.primary.main}`,
    transition: theme.transitions.create('top', { duration: '0.3s' }),
  },

  toolbar: {
    justifyContent: 'space-between',
  },

  headingButtonBox: {
    order: ({ isMobile }) => (isMobile ? 1 : 'initial'),
    '& h1': {
      textTransform: 'lowercase',
    },
  },

  themeSwitchBox: ({ isMobile }) => ({
    order: isMobile ? 2 : 'initial',
    flexGrow: !isMobile ? 1 : 'initial',
  }),

  logoImg: ({ isMobile }) => ({
    width: theme.spacing(isMobile ? 7 : 8),
    margin: '-6px 0', //just to crop it on top and bottom
    marginRight: theme.spacing(isMobile ? 0 : 2),
  }),
}));
