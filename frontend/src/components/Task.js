import { useState, useEffect, useRef } from 'react';
import './../App.css';
import { Typography } from '@mui/material';
import axios from 'axios';

function Task({ task, getTasks }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const input = useRef(null);

  const handleChange = e => {
    setTitle(e.target.value);
  }
  const handleDelete = () => {
    axios
      .delete("http://localhost:8000/delete-task/" + task.id)
      .then(getTasks())
      .catch(err => console.log(err));
  }
  const handleDoubleClick = () => {
    setIsEditing(true);
  }
  const handleSubmit = e => {
    e.preventDefault();
    const body = JSON.stringify({ title, isDone: task.isDone });
    axios
      .put("http://localhost:8000/update-task/" + task.id, body)
      .then(setIsEditing(false))
      .then(getTasks())
      .catch(err => console.log(err));
  }

  useEffect(() => { if (isEditing) input.current.focus() }, [isEditing]);

  return (
    <>
      {isEditing
        ?
        <form onSubmit={e => handleSubmit(e)} className="task">
          <input
            type="text"
            className="task-input"
            name="title"
            value={title}
            onChange={e => handleChange(e)}
            ref={input}
          />
        </form>
        :
        <div className="task" onDoubleClick={handleDoubleClick}>
          <Typography variant="h5">{task.title}</Typography>
          <Typography variant="h5" className="delete-button" onClick={handleDelete}>x</Typography>
        </div>
      }
    </>
  );
}

export default Task;
