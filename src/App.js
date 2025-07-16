import './App.css';
import { Header } from './components/Header';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { MainContent } from './components/Main-Content';
import { useState } from 'react';
import { Login } from './components/Login';
import data from './components/data/data.json';

function App() {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Header isLogged={false} setMenuVisible={ () => setMenuVisible(prev => !prev) }></Header>}></Route>
          <Route path="/*" element={ <Header isLogged={true} setMenuVisible={ () => setMenuVisible(prev => !prev) }></Header> }></Route>
        </Routes>
      </BrowserRouter>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login data={data}></Login>}></Route>
          <Route path="/*" element={ <MainContent data={data} menuVisible={menuVisible}></MainContent> }></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
