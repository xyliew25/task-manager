import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './components/Header';
import Content from './components/Content';
import Buttons from './components/Buttons';
import Footer from './components/Footer';

function App() {
  return (
    <Provider store={store}>
      <div className="body">
        <div className="main">
          <Header />
          <Content />
          <Buttons />
        </div>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
