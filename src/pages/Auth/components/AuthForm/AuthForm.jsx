import { Box, Typography } from '@material-ui/core';
import useStyles from './styles';
import logo from '../../../../assets/images/snapped.ico';
import { useDispatch } from 'react-redux';
import { removeMessage } from '../../../../state/authForms/actions';
import { setIsSubmitting } from '../../../../state/app/actions';

export default function AuthForm({ submitHandler, children }) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const preSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(removeMessage());
    dispatch(setIsSubmitting(true));
  };

  return (
    <form
      className={classes.form}
      onSubmit={(e) => {
        preSubmitHandler(e);
        dispatch(submitHandler());
      }}>
      <Box>
        <img src={logo} alt="snapped!" className={classes.logoImg} />
      </Box>
      <Typography variant="h4" component="h1">
        snapped!
      </Typography>
      {children}
    </form>
  );
}
