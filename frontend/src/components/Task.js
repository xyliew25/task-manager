import './../App.css';
import { useState } from 'react';
import { connect } from 'react-redux';
import TaskTitleOnly from './taskLayouts/TaskTitleOnly';
import TaskWithTagDesc from './taskLayouts/TaskWithTagDesc';
import TaskWithoutDesc from './taskLayouts/TaskWithoutDesc';
import TaskWithoutTag from './taskLayouts/TaskWithoutTag';
import { deleteTask, updateTask } from './../redux/tasks/actions';

function Task({ task, deleteTask, updateTask, enterEditMode }) {
  const [isHoveringEdit, setIsHoveringEdit] = useState(false);
  const [isHoveringDelete, setIsHoveringDelete] = useState(false);

  const handleMouseEnterEdit = () => {
    setIsHoveringEdit(true);
  };
  const handleMouseLeaveEdit = () => {
    setIsHoveringEdit(false);
  };
  const handleMouseEnterDelete = () => {
    setIsHoveringDelete(true);
  };
  const handleMouseLeaveDelete = () => {
    setIsHoveringDelete(false);
  };
  const handleDelete = () => {
    deleteTask(task.id);
  };
  const handleEdit = () => {
    enterEditMode();
  };
  const handleDoubleClick = () => {
    const taskToUpdate = JSON.stringify({ ...task, isDone: !task.isDone });
    updateTask(task.id, taskToUpdate);
  };

  return (
    <div className="task-container">
      {task.tag && task.desc
        ? <TaskWithTagDesc
          task={task}
          isHoveringEdit={isHoveringEdit}
          isHoveringDelete={isHoveringDelete}
          handleMouseEnterEdit={handleMouseEnterEdit}
          handleMouseLeaveEdit={handleMouseLeaveEdit}
          handleMouseEnterDelete={handleMouseEnterDelete}
          handleMouseLeaveDelete={handleMouseLeaveDelete}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleDoubleClick={handleDoubleClick}
        />
        : task.tag && !task.desc
          ? <TaskWithoutDesc
            task={task}
            isHoveringEdit={isHoveringEdit}
            isHoveringDelete={isHoveringDelete}
            handleMouseEnterEdit={handleMouseEnterEdit}
            handleMouseLeaveEdit={handleMouseLeaveEdit}
            handleMouseEnterDelete={handleMouseEnterDelete}
            handleMouseLeaveDelete={handleMouseLeaveDelete}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleDoubleClick={handleDoubleClick}
          />
          : !task.tag && task.desc
            ? <TaskWithoutTag
              task={task}
              isHoveringEdit={isHoveringEdit}
              isHoveringDelete={isHoveringDelete}
              handleMouseEnterEdit={handleMouseEnterEdit}
              handleMouseLeaveEdit={handleMouseLeaveEdit}
              handleMouseEnterDelete={handleMouseEnterDelete}
              handleMouseLeaveDelete={handleMouseLeaveDelete}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleDoubleClick={handleDoubleClick}
            />
            : <TaskTitleOnly
              task={task}
              isHoveringEdit={isHoveringEdit}
              isHoveringDelete={isHoveringDelete}
              handleMouseEnterEdit={handleMouseEnterEdit}
              handleMouseLeaveEdit={handleMouseLeaveEdit}
              handleMouseEnterDelete={handleMouseEnterDelete}
              handleMouseLeaveDelete={handleMouseLeaveDelete}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleDoubleClick={handleDoubleClick}
            />
      }
    </div>
  );
}

const mapDispatchToProps = {
  deleteTask,
  updateTask
}

export default connect(null, mapDispatchToProps)(Task);
