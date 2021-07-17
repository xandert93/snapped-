import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './components';
import { store } from './state';
import AuthProvider from './contexts/1.auth/AuthProvider';
import UploadProvider from './contexts/2.upload/UploadProvider';
import AppProvider from './contexts/3.app/AppProvider';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthProvider>
        <UploadProvider>
          {/* <AppProvider> */}
          <App />
          {/* </AppProvider> */}
        </UploadProvider>
      </AuthProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
