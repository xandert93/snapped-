import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  cardMedia: {
    height: 0,
    paddingBottom: '120%', //1.2x card width
    [theme.breakpoints.up('sm')]: {
      cursor: 'pointer',
      opacity: 0.95,
      '&:hover': {
        opacity: 1,
      },
    },
  },
}));

//known as the padding bottom hack. Use 56.25% for 16:9, or 100% for 1:1 (square)
//for 1:1 shaun also used padding-top: 50%, padding-bottom: 50%
