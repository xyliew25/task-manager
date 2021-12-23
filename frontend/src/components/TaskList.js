import './../App.css';
import Task from "./Task";

function TaskList({ tasks, getTasks }) {
  return (
    <div className="task-list">
      {tasks.map(task => 
        <Task key={task.id} task={task} getTasks={getTasks} />
      )}
    </div>
  );
}

export default TaskList;
