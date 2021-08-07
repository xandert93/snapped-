import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  title: { backgroundImage: `linear-gradient(310deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})` },

  fieldset: {
    width: '100%',

    '& > [role="radiogroup"]': {
      justifyContent: 'center',

      '& svg': {
        [theme.breakpoints.only('xs')]: {
          fontSize: 22,
        },
      },
    },
  },
}));
