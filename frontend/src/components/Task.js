import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import './../App.css';
import { Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { deleteTask, updateTask } from './../redux/tasks/actions';

function Task({ task, deleteTask, updateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const input = useRef(null);

  const handleChange = e => {
    setTitle(e.target.value);
  };
  const handleDelete = () => {
    deleteTask(task.id);
  };
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleDoubleClick = () => {
    const newTask = JSON.stringify({ title: task.title, isDone: !task.isDone });
    updateTask(task.id, newTask);
  };
  const handleSubmit = e => {
    e.preventDefault();
    const newTask = JSON.stringify({ title, isDone: task.isDone });
    updateTask(task.id, newTask);;
    setIsEditing(false);
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

const mapDispatchToProps = {
  deleteTask,
  updateTask
}

export default connect(null, mapDispatchToProps)(Task);
