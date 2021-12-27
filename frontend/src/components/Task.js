import './../App.css';
import { connect } from 'react-redux';
import TaskTitleOnly from './taskLayouts/TaskTitleOnly';
import TaskWithTagDesc from './taskLayouts/TaskWithTagDesc';
import TaskWithoutDesc from './taskLayouts/TaskWithoutDesc';
import TaskWithoutTag from './taskLayouts/TaskWithoutTag';
import { deleteTask, updateTask } from './../redux/tasks/actions';

function Task({ task, deleteTask, updateTask, enterEditMode }) {
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
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleDoubleClick={handleDoubleClick}
        />
        : task.tag && !task.desc
          ? <TaskWithoutDesc task={task}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleDoubleClick={handleDoubleClick}
          />
          : !task.tag && task.desc
            ? <TaskWithoutTag task={task}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleDoubleClick={handleDoubleClick}
            />
            : <TaskTitleOnly task={task}
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
