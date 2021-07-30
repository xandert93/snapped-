import { fade, makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  postCard: () => ({
    //       ^ { isCardMediaHovered }
    transition: theme.transitions.create(
      ['transform', 'box-shadow', 'background-color'],
      {
        duration: theme.transitions.duration.complex,
      }
    ),

    backgroundColor: fade(theme.palette.background.paper, 0.75),

    [theme.breakpoints.down('xs')]: {
      boxShadow: theme.shadows[1],
    },

    [theme.breakpoints.between('sm', 'xl')]: {
      '&:hover': {
        backgroundColor: fade(theme.palette.background.paper, 0.1),
        boxShadow: theme.shadows[20],
        transform: 'translateY(-8px)',
      },
    },

    //put on classes.popper instead
    '& [role="tooltip"]': {
      zIndex: 1,
    },

    // background: fade(
    //   theme.palette.background.paper,
    //   isCardMediaHovered ? 0.4 : 0.8
    // ),
    // boxShadow: theme.shadows[isCardMediaHovered ? 20 : 8],
    // transform: isCardMediaHovered ? 'translateY(-8px)' : 'initial',

    // [theme.breakpoints.down('xs')]: {
    //   boxShadow: theme.shadows[1],
    // },
  }),

  // cardContent2: {
  //   display: 'flex',
  // },

  expandMoreCollapsed: {
    padding: 0,
    marginLeft: 'auto', //pushes ExpandMore to far right
    transitionProperty: 'transform',
    transitionDuration: theme.transitions.duration.shortest,
    //transition: transitions.create("transform", {duration: transitions.duration.shortest})
  },
  expanded: {
    transform: 'rotate(180deg)', //rotate ExpandMore 180deg
  },
}));
