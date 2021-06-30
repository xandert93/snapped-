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
  },

  headingButtonBox: ({ isVPsm, isVPmd }) => ({
    flex: isVPmd ? 1 : 3,
    '& h1': {
      textTransform: 'lowercase',
      display: isVPsm ? 'none' : 'block', //leave <h1> in DOM for SEO?
    },
  }),

  searchBox: {
    flex: 2,
  },

  inputBaseRoot: {},
  input: {
    textAlign: 'center',
    padding: theme.spacing(1.2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.primary.light, 0.25),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.light, 0.35),
    },
    transition: theme.transitions.create('border-color', { duration: '0.3s' }),
    borderBottom: '2px solid transparent',
    '&:focus': {
      borderColor: theme.palette.secondary.light,
    },
  },

  logoImg: ({ isVPsm, isVPmd }) => ({
    width: theme.spacing(isVPsm ? 6 : isVPmd ? 7 : 8),
    margin: '-5px 0 -6px', //just to crop it on top and bottom
    marginRight: theme.spacing(isVPsm ? 0 : 2),
  }),

  // themeSwitchBox: ({ isVPsm }) => ({
  //   order: isVPsm ? 2 : 'initial',
  // }),

  actionsBox: ({ isVPmd }) => ({
    flex: isVPmd ? 1 : 3,
    textAlign: 'right',
    '& > *': {
      padding: theme.spacing(0, 1),
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
