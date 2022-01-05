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
      payload.reverse();
      return {
        ...state,
        tasks: payload,
        filteredTasks: payload
      };
    
    case GET_TASK:
      return {
        ...state,
        task: payload
      };
    
    case CREATE_TASK:
      return {
        ...state,
        tasks: [payload, ...state.tasks],
        filteredTasks: [payload, ...state.filteredTasks]
      };
    
    case DELETE_TASK:
      const id = payload;
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== id),
        filteredTasks: state.filteredTasks.filter(task => task.id !== id)
      };

    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task => task.id === payload.id ? payload : task),
        filteredTasks: state.filteredTasks.map(task => task.id === payload.id ? payload : task)
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
