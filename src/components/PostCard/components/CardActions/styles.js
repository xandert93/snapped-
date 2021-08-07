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

      '& svg': {
        fontSize: theme.spacing(4),
      },
    },
  },

  flameSVG: {
    fill: ({ uiIsLikedByUser }) => theme.palette[uiIsLikedByUser ? 'secondary' : 'primary'].main,
    stroke: ({ uiIsLikedByUser }) => (uiIsLikedByUser ? theme.palette.secondary.dark : 'white'),
    strokeWidth: 0.5,
    transition: theme.transitions.create(['fill', 'stroke'], { duration: '0.5s' }),
  },

  commentSVG: {
    paddingTop: 1,
  },
}));
