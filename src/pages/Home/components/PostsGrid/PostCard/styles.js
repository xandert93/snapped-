import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    transition: theme.transitions.create(['transform', 'box-shadow'], {
      duration: theme.transitions.duration.complex,
    }),
    [theme.breakpoints.up('sm')]: {
      '&:hover': {
        boxShadow: theme.shadows[20],
        transform: 'translateY(-8px)',
      },
    },
  },

  actionButton: {
    padding: theme.spacing(1), //make area more clickable
  },

  cardAvatar: {
    borderRadius: '10px 3px 3px',
    [theme.breakpoints.down('xs')]: {
      borderRadius: '50%',
    },
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

  cardActions: {
    justifyContent: 'space-evenly',
    paddingLeft: 40,
    paddingRight: 40,
    '& div': {
      flex: 1,
      textAlign: 'center',

      '&:not(:last-child)': {
        borderRight: '2px solid',
      },
    },
  },

  cardContent1: {
    paddingTop: 0,
    paddingBottom: 0,
    '& .MuiPagination-ul': {
      justifyContent: 'center',
    },
  },

  cardCaption: { fontWeight: 600, textAlign: 'center' },
  cardTags: { textAlign: 'center' },

  commentSVG: {
    marginTop: 2,
    paddingTop: 1,
  },

  // cardContent2: {
  //   display: 'flex',
  // },

  commentInput: {
    width: '100%',
    fontSize: 16,

    '& .MuiInputAdornment-root': {
      paddingBottom: 5,
      paddingLeft: 5,
    },
  },

  clockIcon: {
    fontSize: theme.spacing(3),
    verticalAlign: -7,
    marginRight: theme.spacing(1),
  },

  clockText: {
    fontStyle: 'italic',
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
