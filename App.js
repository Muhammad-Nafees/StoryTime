import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import Routes from './src/routes';
import { requestPermissions } from './src/utils/permission';
import Toast from 'react-native-toast-message';

const App = () => {

  useEffect(() => {
    requestPermissions();
  }, []);

  return (
    <>
      <Routes />
      <Toast />
    </>
  )
};

export default App;
