import AuthFormsProvider from '../../contexts/4.authForms/AuthFormsProvider';
import { Box, Paper } from '@material-ui/core';
import useStyles from './styles';

import {
  AuthForm,
  Login,
  Register,
  ResetPassword,
  RedirectLinks,
} from './components';
import { ThemeSwitch } from '../../components';
import { useParams } from 'react-router-dom';

export default function Auth() {
  const classes = useStyles();
  const { pageName } = useParams();

  return (
    <AuthFormsProvider pageName={pageName}>
      <Box className={classes.layout}>
        <Paper className={classes.formPaper} elevation={10}>
          <AuthForm>
            {pageName === 'register' && <Register />}
            {pageName === 'login' && <Login />}
            {pageName === 'password-reset' && <ResetPassword />}
          </AuthForm>

          <RedirectLinks pageName={pageName} />
          <Box className={classes.themeSwitchBox}>
            <ThemeSwitch />
          </Box>
        </Paper>
      </Box>
    </AuthFormsProvider>
  );
}
