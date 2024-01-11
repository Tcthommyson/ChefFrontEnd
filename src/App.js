import './App.css';
import Login from './Components/LoginSignup/Login';
import SignUp from './Components/LoginSignup/Signup';
import Home from './Components/Home.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact Component={Home}/>
          <Route path='/login' Component={Login}/>
          <Route path='/register' Component={SignUp}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
