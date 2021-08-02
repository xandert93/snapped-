import { useEffect, useRef } from 'react';
import { auth } from '../../lib/firebase/config';

import { useDispatch, useSelector } from 'react-redux';
import { isDarkModeSelector } from '../../state/app/selectors';
import { userSelector } from '../../state/auth/selectors';
import { authenticateUserRecord } from '../../state/auth/actions';
import { setDataURL } from '../../state/upload/actions';
import { openPostCreateDialog } from '../../state/app/actions';

import { dark, light } from '../../styles/themes';
import { ThemeProvider, CssBaseline } from '@material-ui/core';

import { Redirect, Route, Switch } from 'react-router-dom';
import { PublicRoute, ProtectedRoute } from '../../utils';
import { ROUTES } from '../../constants/routes';

import { NavBar } from '../NavBar';

import { Auth, Home, Profile, Account, Explore, SinglePost, Search } from '../../pages';

import {
  PreLoader,
  Main,
  WelcomeDialog,
  PostCreateDialog,
  PostClickDialog,
  PostEditDialog,
  ConfirmationDialog,
  Snackbar,
} from './components';

export default function App() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(isDarkModeSelector);
  const isCheckingUser = useSelector((state) => state.auth.isCheckingUser);
  const user = useSelector(userSelector);
  //because we're selecting user, everytime user state updates, whole app will re-render :(
  //user updates when we add/remove following, change pfp etc.

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userRecord) => dispatch(authenticateUserRecord(userRecord)));
    return unsubscribe;
  }, []);

  const readerRef = useRef(new FileReader());
  useEffect(() => {
    readerRef.current.onload = (e) => {
      //fires when picked or dragged file pass type/size tests --> reader.readAsDataURL(file)
      dispatch(setDataURL(e.target.result));
      dispatch(openPostCreateDialog());
    };
  }, [readerRef]);

  if (isCheckingUser)
    return (
      <ThemeProvider theme={isDarkMode ? dark : light}>
        <CssBaseline />
        <PreLoader />
      </ThemeProvider>
    );
  else
    return (
      <ThemeProvider theme={isDarkMode ? dark : light}>
        <CssBaseline />
        {user && <NavBar reader={readerRef.current} />}
        <Main reader={readerRef.current}>
          <Switch>
            <PublicRoute path={ROUTES.AUTH} component={Auth} />

            <Redirect exact from={'/'} to={ROUTES.HOME} />
            <ProtectedRoute exact path={ROUTES.HOME} component={Home} />

            <Redirect exact from={`/profiles/${user?.username}`} to={`/profiles/${user?.username}/public`} />

            <ProtectedRoute exact path={ROUTES.USER_PROFILE} component={Profile} />
            <ProtectedRoute exact path={ROUTES.ALT_PROFILE} component={Profile} />

            <ProtectedRoute exact path={ROUTES.EXPLORE} component={Explore} />
            <ProtectedRoute exact path={ROUTES.SINGLE_POST} component={SinglePost} />
            <ProtectedRoute exact path={ROUTES.SEARCH} component={Search} />
            <ProtectedRoute exact path={ROUTES.ACCOUNT} component={Account} />

            {/* <Redirect to={ROUTES.NOT_FOUND} />  */}
            <Route render={() => <h5>404 RNF</h5>} />
          </Switch>
        </Main>

        {user && <WelcomeDialog />}
        <PostCreateDialog />
        <PostClickDialog />
        <PostEditDialog />
        <ConfirmationDialog />
        <Snackbar />
      </ThemeProvider>
    );
}

//NOTES:
/*
- The <Redirect/> from "/camera-roll" to ".../public" is considered good 
practice in the event someone manually navigates to "/camera-roll". 
They are now redirected to the <ProtectedRoute/> above it.

*/
