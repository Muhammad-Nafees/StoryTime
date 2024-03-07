import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import Routes from './src/routes';
import { requestPermissions } from './src/utils/permission';

const App = () => {

  useEffect(() => {
    requestPermissions();
  }, []);

  return <Routes />;
};

export default App;
