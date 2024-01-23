import Login from './Components/LoginSignup/Login';
import SignUp from './Components/LoginSignup/Signup';
import Home from './Components/Home.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SettingsPage from './Components/Internal/SettingsPage.js';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact Component={Home}/>
          <Route path='/login' Component={Login}/>
          <Route path='/register' Component={SignUp}/>
          <Route path='/settings' Component={SettingsPage}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
