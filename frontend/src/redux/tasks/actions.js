import axios from 'axios';
import {
  GET_TASKS,
  GET_TASK,
  CREATE_TASK,
  DELETE_TASK,
  UPDATE_TASK
} from './types';

export const getTasks = () => dispatch => {
  axios
    .get("http://localhost:8000/tasks")
    .then(res => dispatch({
      type: GET_TASKS,
      payload: res.data
    }))
    .catch(err => console.log(err));
};

export const getTask = id => dispatch => {
  axios
    .get("http://localhost:8000/tasks/" + id)
    .then(res => dispatch({
      type: GET_TASK,
      payload: res.data
    }))
    .catch(err => console.log(err));
};

export const createTask = task => dispatch => {
  axios
    .post("http://localhost:8000/create-task", task)
    .then(res => dispatch({
      type: CREATE_TASK,
      payload: res.data
    }))
    .catch(err => console.log(err));
};

export const deleteTask = id => dispatch => {
  axios
  .delete("http://localhost:8000/delete-task/" + id)
  .then(res => dispatch({
    type: DELETE_TASK,
    payload: res.data
  }))
  .catch(err => console.log(err));
};

export const updateTask = (id, task) => dispatch => {
  axios
  .put("http://localhost:8000/update-task/" + id, task)
  .then(res => dispatch({
    type: UPDATE_TASK,
    payload: res.data
  }))
  .catch(err => console.log(err));
};
