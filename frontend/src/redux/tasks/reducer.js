import {
  GET_TASKS,
  GET_TASK,
  CREATE_TASK,
  DELETE_TASK,
  UPDATE_TASK
} from './types';

const initialState = {
  tasks: [],
  task: null
}

const taskReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: payload.reverse()
      };
    
    case GET_TASK:
      return {
        ...state,
        task: payload
      };
    
    case CREATE_TASK:
      return {
        ...state,
        tasks: payload.reverse()
      };
    
    case DELETE_TASK:
      return {
        ...state,
        tasks: payload.reverse()
      };

    case UPDATE_TASK:
      return {
        ...state,
        tasks: payload.reverse()
      };

    default:
      return state;
  }
};

export default taskReducer;
