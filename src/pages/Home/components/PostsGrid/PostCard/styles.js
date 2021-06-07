import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  cardHeader: {
    transition: 'background-color 0.2s, color 0.2s',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
    },
  },

  cardTitle: {
    fontWeight: 600,
  },

  cardMedia: {
    height: 0,
    paddingBottom: '120%', //1.2x card width

    //known as the padding bottom hack. Use 56.25% for 16:9, or 100% for 1:1 (square)
    //for 1:1 shaun also used padding-top: 50%, padding-bottom: 50%

    [theme.breakpoints.up('sm')]: {
      cursor: 'pointer',
      opacity: 0.95,
      '&:hover': {
        opacity: 1,
      },
    },
  },

  cardContentPrimary: {
    display: 'flex',
  },

  clockIcon: {
    verticalAlign: -theme.spacing(1),
    marginRight: '12px',
  },

  clockText: {
    fontStyle: 'italic',
    flexGrow: 1,
  },

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
