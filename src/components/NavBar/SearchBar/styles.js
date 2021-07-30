import { makeStyles, fade } from '@material-ui/core';

export default makeStyles((theme) => ({
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
}));
