import { Switch } from 'react-router-dom';
import './App.scss';
import Auth from './components/public/Auth/Auth';
import ProtectedRoute from './components/public/ProtectedRoute';
import PublicRoute from './components/public/PublicRoute';
import CameraRoll from './components/protected/pages/CameraRoll/CameraRoll';
import Home from './components/protected/pages/Home/Home';
import MyAccount from './components/protected/pages/MyAccount/MyAccount';
import NavBar from './components/protected/layout/NavBar/NavBar';
import { useContext, useEffect, useState, useRef } from 'react';
import authContext from './contexts/auth/authContext';
import Main from './components/protected/pages/Main';

import { Publish } from '@material-ui/icons';
import useStyles from './styles';
import SlidingDialog from './components/protected/SlidingDialog';
import SlidingDialogForm from './components/protected/SlidingDialogForm';
import ProgressBar from './components/protected/image-upload/ProgressBar';

const App = () => {
  const { currentUser } = useContext(authContext);

  const [innerWidth, setInnerWidth] = useState(0);

  useEffect(() => {
    setInnerWidth(window.innerWidth);
    window.onresize = () => {
      setInnerWidth(window.innerWidth);
    };
  }, []);

  const readerRef = useRef(new FileReader());
  const [dataURL, setDataURL] = useState('');
  useEffect(() => {
    readerRef.current.onload = (e) => setDataURL(e.target.result);
  }, []);

  const [fileErrMsg, setFileErrMsg] = useState('');
  const [file, setFile] = useState(null);
  const [fileInfo, setFileInfo] = useState({ file: null, path: '' });

  const [description, setDescription] = useState(null);

  const validateFile = (selectedFile) => {
    if (selectedFile) {
      if (['image/png', 'image/jpeg'].includes(selectedFile.type)) {
        setFileErrMsg('');
        setFileInfo({ file: selectedFile });
        readerRef.current.readAsDataURL(selectedFile);
        return;
      } else {
        setFileErrMsg('Please choose an image file (.png or .jpeg)');
        return;
      }
    } else {
      setFileErrMsg('');
      setFileInfo({ file: null, path: '' });
      return;
    }
  };

  const resetForm = () => {
    setFileInfo({ file: null, path: '' });
    setFile(null);
    setDataURL('');
  };

  return (
    <>
      {currentUser && <NavBar {...{ validateFile, fileInfo, innerWidth }} />}
      <Main {...{ validateFile }}>
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            innerWidth={innerWidth}
            component={Home}
          />
          <ProtectedRoute path="/camera-roll" component={CameraRoll} />
          <ProtectedRoute path="/my-account" component={MyAccount} />

          <PublicRoute path="/auth/:userAction" component={Auth} />
          {/* <Route render={() => <h5>Not Found 404</h5>} /> */}
        </Switch>
      </Main>

      <SlidingDialog
        {...{
          showModal: dataURL,
          closeModal: resetForm,
          modalHeading: 'Create Your Post!',
        }}>
        {!file ? (
          <SlidingDialogForm
            {...{
              type: 'create',
              imageURL: dataURL,
              fileInfo,
              setFile,
              setDescription,
              submitIcon: <Publish color="primary" />,
            }}
          />
        ) : (
          <ProgressBar {...{ file, description, resetForm }} />
        )}
      </SlidingDialog>
    </>
  );
};

export default App;
