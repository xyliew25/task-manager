import './App.css';
import AddButton from './components/AddButton';
import Footer from './components/Footer';
import Input from './components/Input';
import Header from './components/Header';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="body">
      <div className="main">
        <Header />
        <AddButton />
        <Input />
        <TaskList />
      </div>
      <Footer />
    </div>
  );
}

export default App;
