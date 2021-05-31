import { Redirect, Switch } from 'react-router-dom';
import './App.scss';
import Auth from './components/public/Auth';
import ProtectedRoute from './components/public/ProtectedRoute';
import PublicRoute from './components/public/PublicRoute';
import CameraRoll2 from './components/protected/pages/CameraRoll/CameraRoll2';
import Home from './components/protected/pages/Home/Home';
import MyAccount from './components/protected/pages/MyAccount/MyAccount';
import NavBar from './components/protected/layout/NavBar/NavBar';
import { useContext, useEffect, useState, useRef } from 'react';
import authContext from './contexts/auth/authContext';
import Main from './components/protected/pages/Main';

import { Publish } from '@material-ui/icons';
import SlidingModal from './components/protected/SlidingModal';
import Progress from './components/protected/layout/Progress/Progress';
import { useGetDeviceWidth, useFileReader } from './custom-hooks';
import { themeLight, themeDark } from './theme/theme';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import OtherUser from './components/protected/pages/OtherUser/OtherUser';
import CreatePost from './components/protected/pages/Home/Posts/CreatePost';

import * as ROUTES from './constants/routes';

const App = () => {
  const { currentUserDoc } = useContext(authContext);
  const [darkMode, setDarkMode] = useState(false);

  const innerWidth = useGetDeviceWidth();

  const [readerRef, dataURL, setDataURL] = useFileReader();

  const [msgData, setMsgData] = useState(null);
  const [fileData, setFileData] = useState({ file: null, path: '' });
  const [file, setFile] = useState(null);

  const [description, setDescription] = useState(null);

  const validateFile = (selectedFile) => {
    if (selectedFile) {
      if (['image/png', 'image/jpeg'].includes(selectedFile.type)) {
        setMsgData(null);
        setFileData({ file: selectedFile });
        readerRef.current.readAsDataURL(selectedFile);
        return;
      } else {
        setMsgData({
          success: false,
          msg: 'Please choose an image file (.png or .jpeg)',
        });
        return;
      }
    } else {
      setMsgData(null);
      setFileData({ file: null, path: '' });
      return;
    }
  };

  const resetForm = () => {
    setFileData({ file: null, path: '' });
    setFile(null);
    setDataURL('');
  };

  return (
    <ThemeProvider theme={!darkMode ? themeLight : themeDark}>
      <CssBaseline />
      {currentUserDoc && (
        <NavBar
          {...{ validateFile, fileData, innerWidth, darkMode, setDarkMode }}
        />
      )}
      <Main {...{ validateFile }}>
        <Switch>
          <PublicRoute
            path={ROUTES.AUTH}
            {...{ darkMode, setDarkMode }}
            component={Auth}
          />
          <ProtectedRoute
            exact
            path={ROUTES.HOME}
            innerWidth={innerWidth}
            component={Home}
          />
          <ProtectedRoute
            path="/camera-roll/:tabName"
            component={CameraRoll2}
          />
          <Redirect exact from="/camera-roll" to="/camera-roll/public" />
          {/*considered good practice in case someone navigates to
          "/camera-roll". Now redirected to Protected Route above*/}

          <Redirect
            from={`/p/${currentUserDoc.username}`}
            to={'/camera-roll/public'}
          />
          <ProtectedRoute path="/p/:username" component={OtherUser} />

          <ProtectedRoute path={ROUTES.USER_ACCOUNT} component={MyAccount} />

          {/* <Route render={() => <h5>Not Found 404</h5>} /> */}
        </Switch>
      </Main>

      <SlidingModal
        {...{
          showModal: !!dataURL,
          closeModal: resetForm,
          modalHeading: 'Create Your Post!',
        }}>
        {!file ? (
          <CreatePost
            {...{
              type: 'create',
              imageURL: dataURL,
              fileData,
              setFile,
              setDescription,
              submitIcon: <Publish color="primary" />,
            }}
          />
        ) : (
          <Progress {...{ file, description, resetForm }} />
        )}
      </SlidingModal>
    </ThemeProvider>
  );
};

export default App;
