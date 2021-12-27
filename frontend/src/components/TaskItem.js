import { useState } from 'react';
import TaskForm from './TaskForm';
import Task from './Task';

function TaskItem({ task }) {
  const [isEditing, setIsEditing] = useState(false);

  const exitEditMode = () => {
    setIsEditing(false);
  };
  const enterEditMode = () => {
    setIsEditing(true);
  };
  
  return (
    <div>
      {isEditing
        ? <TaskForm initialFormFields={task} exitEditMode={exitEditMode} />
        : <Task task={task} enterEditMode={enterEditMode} />
      }
    </div>
  );
}

export default TaskItem;
