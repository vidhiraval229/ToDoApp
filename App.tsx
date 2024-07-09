import React from 'react';
import { Provider } from 'react-redux';
import store from './src/storage/store';
import TodoList from './src/screens/TodoLIst';

const App = () => {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
};

export default App;
