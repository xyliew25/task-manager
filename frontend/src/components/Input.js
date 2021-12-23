import { useState } from 'react';
import AddButton from './AddButton';
import './../App.css';
import axios from 'axios';

function Input({ getTasks }) {
  const [title, setTitle] = useState("")

  const handleChange = e => {
    setTitle(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const body = JSON.stringify({ title, isDone: false });
    axios
      .post("http://localhost:8000/create-task", body)
      .then(setTitle(""))
      .then(getTasks())
      .catch(err => console.log(err));
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

export default Input;
