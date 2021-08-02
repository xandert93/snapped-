import { fade, makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  appBar: {
    borderBottom: `3px solid ${theme.palette.primary.main}`,
  },

  toolbar: {
    justifyContent: 'space-between',

    '& svg': {
      fontSize: theme.spacing(5),
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.spacing(3.5),
      },
    },

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 1), //*0 16px
    },
  },

  headingButtonBox: ({ isVPsm, isVPmd }) => ({
    flex: isVPmd ? 1 : 3,
    '& h1': {
      textTransform: 'lowercase',
      display: isVPsm ? 'none' : 'block', //leave <h1> in DOM for SEO?
    },

    '& .MuiIconButton-root': {
      padding: theme.spacing(1),
    },
  }),

  headingPrimary: {
    backgroundImage: `linear-gradient(90deg, ${theme.palette.secondary.light}, ${theme.palette.primary.light})`,
    color: 'transparent',
    '-webkit-background-clip': 'text',
  },

  logoImg: ({ isVPsm, isVPmd }) => ({
    width: theme.spacing(isVPsm ? 6 : isVPmd ? 7 : 8),
    margin: '-5px 0 -6px', //just to crop it on top and bottom
    marginRight: theme.spacing(isVPsm ? 0 : 2),
  }),

  actionsBox: ({ isVPmd }) => ({
    flex: isVPmd ? 1 : 3,
    textAlign: 'right',
    '& > *': {
      padding: theme.spacing(0, 1),
    },

    //for some reason, <a> font-size affects settings icon positioning
    '& .MuiLink-root': {
      fontSize: 0,
    },
  }),

  avatar: {
    border: 'medium solid ' + theme.palette.text.primary,
    height: theme.spacing(4.5),
    width: theme.spacing(4.5),
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(2.8),
      width: theme.spacing(2.8),
    },
  },

  notificationButton: {
    '& .MuiBadge-anchorOriginTopRightRectangle': {
      transform: 'scale(1) translate(-30%, 50%)',
    },
  },

  drawerContentBox: {
    '& .MuiSvgIcon-root': {
      fontSize: theme.spacing(5),
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.spacing(3.5),
      },
    },
  },
}));
