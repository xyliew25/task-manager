import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import Footer from './components/Footer';
import Input from './components/Input';
import Header from './components/Header';
import TaskList from './components/TaskList';

function App() {
  return (
    <Provider store={store}>
      <div className="body">
        <div className="main">
          <Header />
          <Input />
          <TaskList />
        </div>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
