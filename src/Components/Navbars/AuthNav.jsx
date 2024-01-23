import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AuthNav() {
  const [pfplink, setPfp] = useState("https://github.com/mdo.png")
  const navigate = useNavigate();

  const logout = async () => {
    const response = await fetch("/api/logout/", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    })
    if(response.ok){
      navigate('/login')
    }
  }

  useEffect(()=>{
    (async ()=>{
        const response = await fetch("/api/chef", {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
          })
        
        if(response.ok){
            const content = await response.json()
            setPfp(content.profilepic)
        }
    })()
  })

  return (
    <div>
    <div class="container-fluid bg-dark">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <Link to={'/'} className='navbar-brand text-light'>Pubchef (Logo)</Link>
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><a class="nav-link px-2 link-secondary"></a></li>
          <li><button class="btn btn-success rounded-pill px-3" type="button">New Posting</button></li>
        </ul>
        <div class="dropdown text-end">
          <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src={pfplink} alt="mdo" width="32" height="32" class="rounded-circle"></img>
          </a>
          <ul class="dropdown-menu text-small">
            <li><Link to={'/settings'} className="dropdown-item">Settings</Link></li>
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li><hr class="dropdown-divider"></hr></li>
            <li><a class="dropdown-item" onClick={logout}>Sign out</a></li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
}

export default AuthNav;