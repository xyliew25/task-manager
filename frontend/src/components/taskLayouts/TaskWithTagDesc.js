import './../../App.css';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

function TaskWithTagDesc({
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
    <>
      <span className="row">
        <div className="task-tag">
          {task.tag}
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
      <div className="task-title" onDoubleClick={handleDoubleClick}>
        {task.title}
      </div>
      <div className="task-desc">
        {task.desc}
      </div>
    </>
  );
}

export default TaskWithTagDesc;
