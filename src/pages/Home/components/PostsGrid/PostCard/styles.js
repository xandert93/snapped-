import { fade, makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  postCard: ({ isCardMediaHovered }) => ({
    transition: theme.transitions.create(['transform', 'box-shadow'], {
      duration: theme.transitions.duration.complex,
    }),

    backgroundColor: fade(
      theme.palette.common.black,
      isCardMediaHovered ? 0.05 : 0.1
    ),
    boxShadow: theme.shadows[isCardMediaHovered ? 20 : 8],
    transform: isCardMediaHovered ? 'translateY(-8px)' : 'initial',

    [theme.breakpoints.down('xs')]: {
      boxShadow: theme.shadows[1],
      backgroundColor: 'initial',
    },
  }),

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

      '&:not(:first-child)': {
        marginLeft: 0,
      },
      '&:not(:last-child)': {
        borderRight: '2px solid',
      },
    },
  },

  cardContent3: {
    '& .MuiPagination-ul': {
      justifyContent: 'center',
    },
  },

  cardCaption: {
    fontWeight: 600,
    textAlign: 'center',
  },

  cardTags: {
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: 600,
  },

  commentSVG: {
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
