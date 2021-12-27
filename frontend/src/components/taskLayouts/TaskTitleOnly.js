import './../../App.css';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

function TaskTitleOnly({ 
  task, 
  isHoveringEdit, 
  isHoveringDelete, 
  handleMouseEnterEdit, 
  handleMouseLeaveEdit, 
  handleMouseEnterDelete, 
  handleMouseLeaveDelete, 
  handleEdit, 
  handleDelete, 
  handleDoubleClick 
}) {
  return (
    <span className="row-title-only">
      <div className={task.isDone ? "strikethrough task-title" : "task-title"}
        onDoubleClick={handleDoubleClick}
      >
        {task.title}
      </div>
      <span>
        <EditOutlinedIcon
          className={isHoveringEdit ? "icon-btn" : "icon-btn hidden"}
          onClick={handleEdit}
          onMouseEnter={handleMouseEnterEdit}
          onMouseLeave={handleMouseLeaveEdit}
        />
        <DeleteOutlinedIcon
          className={isHoveringDelete ? "icon-btn" : "icon-btn hidden"}
          onClick={handleDelete}
          onMouseEnter={handleMouseEnterDelete}
          onMouseLeave={handleMouseLeaveDelete}
        />
      </span>
    </span>
  );
}

export default TaskTitleOnly;
