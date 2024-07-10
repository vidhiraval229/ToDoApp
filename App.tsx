import React from 'react';
import { Provider } from 'react-redux';

import Toast from 'react-native-toast-message';

import store from './src/storage/store';
import TodoList from './src/screens/TodoLIst';
import { toastConfig } from './src/utils/methodUtils';


const App = () => {
  return (
    <Provider store={store}>
      <TodoList />
      <Toast config={toastConfig} />
    </Provider>
  );
};

export default App;
