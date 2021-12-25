import { useState } from 'react';
import { connect } from 'react-redux';
import AddButton from './AddButton';
import './../App.css';
import { createTask } from './../redux/tasks/actions';

function Input({ createTask }) {
  const [title, setTitle] = useState("")

  const handleChange = e => {
    setTitle(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const task = JSON.stringify({ title, isDone: false });
    createTask(task);
    setTitle("");
  }

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <input 
        type="text" 
        placeholder="Type something..." 
        className="input"
        name="title"
        value={title}
        onChange={e => handleChange(e)}
      / >

      <AddButton handleSubmit={e => handleSubmit(e)}/>
    </form>
  );
}

const mapDispatchToProps = {
  createTask
};

export default connect(null, mapDispatchToProps)(Input);
