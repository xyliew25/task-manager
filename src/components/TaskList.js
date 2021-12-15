import './../App.css';
import Task from "./Task";

const tasks = [
  {
    id: 1,
    title: "Study with friends",
    done: false
  },
  {
    id: 2,
    title: "Buy groceries",
    done: true
  },
  {
    id: 3,
    title: "Read textbook",
    done: true
  },
  {
    id: 4,
    title: "Study with friends",
    done: false
  },
  {
    id: 5,
    title: "Buy groceries",
    done: true
  },
  {
    id: 6,
    title: "Read textbook",
    done: true
  },
  {
    id: 7,
    title: "Study with friends",
    done: false
  },
  {
    id: 8,
    title: "Buy groceries",
    done: true
  },
  {
    id: 9,
    title: "Read textbook",
    done: true
  },
];

function TaskList() {
  return (
    <div className="task-list">
      {tasks.map(task => 
        <Task key={task.id} task={task} />
      )}
    </div>
  );
}

export default TaskList;
