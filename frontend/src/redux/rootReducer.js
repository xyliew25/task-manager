import { combineReducers } from 'redux';
import taskReducer from './tasks/reducer';
import buttonReducer from './buttons/reducer';

const rootReducer = combineReducers({ 
  tasks: taskReducer,
  buttons: buttonReducer
});

export default rootReducer;
