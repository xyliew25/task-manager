import { useState, useEffect, useRef } from 'react';
import './../App.css';
import { Typography } from '@mui/material';
import axios from 'axios';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

function Task({ task, getTasks }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const input = useRef(null);

  const handleChange = e => {
    setTitle(e.target.value);
  };
  const handleDelete = () => {
    axios
      .delete("http://localhost:8000/delete-task/" + task.id)
      .then(getTasks())
      .catch(err => console.log(err));
  };
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleDoubleClick = () => {
    const body = JSON.stringify({ title: task.title, isDone: !task.isDone });
    axios
      .put("http://localhost:8000/update-task/" + task.id, body)
      .then(getTasks())
      .catch(err => console.log(err));
  };
  const handleSubmit = e => {
    e.preventDefault();
    const body = JSON.stringify({ title, isDone: task.isDone });
    axios
      .put("http://localhost:8000/update-task/" + task.id, body)
      .then(setIsEditing(false))
      .then(getTasks())
      .catch(err => console.log(err));
  };

  useEffect(() => { if (isEditing) input.current.focus() }, [isEditing]);

  return (
    <>
      {isEditing
        ?
        <form onSubmit={e => handleSubmit(e)} className="task-container">
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
        <div className="task-container">
          <Typography
            variant="h5"
            className={task.isDone ? "strikethrough task-title" : "task-title"}
            onDoubleClick={handleDoubleClick}
          >
            {task.title}
          </Typography>
          <span>
            <EditOutlinedIcon className="icon-btn" onClick={handleEdit} />
            <DeleteOutlinedIcon className="icon-btn" onClick={handleDelete} />
          </span>
        </div>
      }
    </>
  );
}

export default Task;
