import logo from './logo.svg';
import './App.css';
import Login from './login/Login';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './home/Home';
import MainTabView from './login/MainTabView';
import UnReadArticles from './home/UnReadArticles';





function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainTabView />} />
          <Route path="/home" element={<Home />} />
          <Route path="/unReadArticles" element={<UnReadArticles />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
