import './../../App.css';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

function TaskWithTagDesc({ task, handleEdit, handleDelete, handleDoubleClick }) {
  return (
    <>
      <span className="row">
        <div className="task-tag">
          {task.tag}
        </div>
        <span>
          <EditOutlinedIcon className="icon-btn" onClick={handleEdit} />
          <DeleteOutlinedIcon className="icon-btn" onClick={handleDelete} />
        </span>
      </span>
      <div className={task.isDone ? "strikethrough task-title" : "task-title"}
        onDoubleClick={handleDoubleClick}
      >
        {task.title}
      </div>
      <div className="task-desc">
        {task.desc}
      </div>
    </>
  );
}

export default TaskWithTagDesc;
