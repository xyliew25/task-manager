import {
  GET_TASKS,
  GET_TASK,
  CREATE_TASK,
  DELETE_TASK,
  UPDATE_TASK,
  SEARCH_TASK
} from './types';

const initialState = {
  tasks: [],
  filteredTasks: [],
  task: null
}

const taskReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: payload.reverse(),
        filteredTasks: payload.reverse()
      };
    
    case GET_TASK:
      return {
        ...state,
        task: payload
      };
    
    case CREATE_TASK:
      return {
        ...state,
        tasks: payload.reverse(),
        filteredTasks: payload.reverse()
      };
    
    case DELETE_TASK:
      return {
        ...state,
        tasks: payload.reverse(),
        filteredTasks: payload.reverse()
      };

    case UPDATE_TASK:
      return {
        ...state,
        tasks: payload.reverse(),
        filteredTasks: payload.reverse()
      };
    
    case SEARCH_TASK:
      const keyword = payload.toLowerCase();
      const includesKeywordPredicate = task => (
        task.title.toLowerCase().includes(keyword) 
        || task.desc.toLowerCase().includes(keyword) 
        || task.tag.toLowerCase().includes(keyword)
      );
      return {
        ...state,
        filteredTasks: state.tasks.filter(includesKeywordPredicate).reverse()
      };

    default:
      return state;
  }
};

export default taskReducer;
