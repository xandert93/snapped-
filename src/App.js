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
import SlidingModal from './components/protected/SlidingModal';
import PostForm from './components/protected/PostForm';
import Progress from './components/protected/layout/Progress/Progress';
import useGetDeviceWidth from './custom-hooks/useGetDeviceWidth';

const App = () => {
  const { currentUser } = useContext(authContext);

  const innerWidth = useGetDeviceWidth();

  const readerRef = useRef(new FileReader());
  const [dataURL, setDataURL] = useState('');
  useEffect(() => {
    readerRef.current.onload = (e) => setDataURL(e.target.result);
  }, []);

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
    <>
      {currentUser && <NavBar {...{ validateFile, fileData, innerWidth }} />}
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

      <SlidingModal
        {...{
          showModal: !!dataURL,
          closeModal: resetForm,
          modalHeading: 'Create Your Post!',
        }}>
        {!file ? (
          <PostForm
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
    </>
  );
};

export default App;
