import { createStore, combineReducers } from 'redux';
import tasksReducer from './reducer/taskReducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
});

const store = createStore(rootReducer);

export default store;
