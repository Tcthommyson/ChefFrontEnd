import Login from './Components/LoginSignup/Login';
import SignUp from './Components/LoginSignup/Signup';
import Home from './Components/Home.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SettingsPage from './Components/Internal/SettingsPage.js';
import Post from './Components/Internal/Post.js';
import ManagePosts from './Components/Internal/ManagePosts.js';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact Component={Home}/>
          <Route path='/login' Component={Login}/>
          <Route path='/register' Component={SignUp}/>
          <Route path='/settings' Component={SettingsPage}/>
          <Route path='/post' Component={Post}/>
          <Route path='/manage' Component={ManagePosts}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
