import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  cardMediaBox: {
    position: 'relative',
  },

  cardMedia: {
    height: 0,
    paddingBottom: '120%', //1.2x card width

    //known as the padding bottom hack. Use 56.25% for 16:9, or 100% for 1:1 (square)
    //for 1:1 shaun also used padding-top: 50%, padding-bottom: 50%

    [theme.breakpoints.up('sm')]: {
      paddingBottom: '100%',
      cursor: 'pointer',
    },
  },

  heartBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '& svg': {
      fontSize: theme.spacing(20),
      [theme.breakpoints.only('sm')]: {
        fontSize: theme.spacing(30),
      },
    },
  },

  flameSVG: {
    fill: ({ uiIsLikedByUser }) => theme.palette[uiIsLikedByUser ? 'secondary' : 'primary'].main,
    stroke: ({ uiIsLikedByUser }) => (uiIsLikedByUser ? theme.palette.secondary.dark : 'white'),
    strokeWidth: 0.2,
  },
}));
