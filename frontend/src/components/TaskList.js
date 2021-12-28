import './../App.css';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import TaskItem from "./TaskItem";
import { getTasks } from './../redux/tasks/actions';

function TaskList({ filteredTasks, getTasks }) {
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="task-list">
      {filteredTasks.map(task => 
        <TaskItem key={task.id} task={task} />
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  filteredTasks: state.tasks.filteredTasks
})

const mapDispatchToProps = {
  getTasks
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
