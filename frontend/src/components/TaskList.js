import './../App.css';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import TaskItem from "./TaskItem";
import { getTasks } from './../redux/tasks/actions';

function TaskList({ tasks, getTasks }) {
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="task-list">
      {tasks.map(task => 
        <TaskItem key={task.id} task={task} />
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  tasks: state.tasks.tasks
})

const mapDispatchToProps = {
  getTasks
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
