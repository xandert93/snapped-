import { Box, Typography } from '@material-ui/core';
import { Link } from '../../../../components';
import useStyles from './styles';

export default function RedirectLinks({ pageName }) {
  const classes = useStyles();

  return (
    <Box className={classes.redirectsBox}>
      {pageName === 'login' && (
        <>
          <Typography>
            Forgotten Password?{' '}
            <Link to="/auth/password-reset">Reset Password</Link>
          </Typography>
          <Typography>
            No Account? <Link to="/auth/register">Create an Account</Link>
          </Typography>
        </>
      )}
      {pageName === 'password-reset' && (
        <Typography>
          Remembered Password? <Link to="/auth/login">Log in</Link>
        </Typography>
      )}
      {pageName === 'register' && (
        <Typography>
          Already registered? <Link to="/auth/login">Log in</Link>
        </Typography>
      )}
    </Box>
  );
}
