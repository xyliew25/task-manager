import './../App.css';
import { Typography } from '@mui/material';

function Task({ task }) {
  return (
    <div className="task">
      <Typography variant="h5">{task.title}</Typography>
      <Typography variant="h5" className="delete-button">x</Typography>
    </div>  
  );
}

export default Task;
