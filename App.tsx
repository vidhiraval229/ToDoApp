import React from 'react';
import { Provider } from 'react-redux';

import Toast from 'react-native-toast-message';

import store from './src/storage/store';
import { toastConfig } from './src/utils/methodUtils';
import AppNavigator from './src/navigation/AppNavigator';


const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator/>
      <Toast config={toastConfig} />
    </Provider>
  );
};

export default App;
