import './App.css';
import Footer from './components/Footer';
import Input from './components/Input';
import Header from './components/Header';
import TaskList from './components/TaskList';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => { getTasks() }, []);

  const getTasks = () => {
    axios
    .get("http://localhost:8000/tasks")
    .then(res => setTasks(res.data))
    .catch(err => console.log(err));
  };

  return (
    <div className="body">
      <div className="main">
        <Header />
        <Input getTasks={getTasks} />
        <TaskList tasks={tasks} getTasks={getTasks} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
