import React, {useEffect, useState} from 'react';
import DefNav from './Navbars/DefNav';
import AuthNav from './Navbars/AuthNav';
import './Home.css'
// Make a navbar component for users that are signed in and one for users that aren't
// Split this page up into components only later on with the login logic

function Home() {
  const [userid, setUserid] = useState('');

  useEffect(()=>{
    (async ()=>{
        const response = await fetch("/api/user", { //change this so that its less requests, can send data to stuff like authnav. Also fix multiple renders and requests?
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
          })
        
        if(response.ok){
            const content = await response.json()
            setUserid(content.id)
        }
    })()
  })
  //separate the search bar into another component
  return (
    <div>
       {userid ? <AuthNav></AuthNav> : <DefNav></DefNav>}
        <div class="container pt-3 bg-transparent">
            <div class="row d-flex">
                <div class="col-auto">
                <div class="dropdown">
                    <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
                    Search by...
                    </button>
                    <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Name</a></li>
                    <li><a class="dropdown-item" href="#">Chef Name</a></li>
                    <li><a class="dropdown-item" href="#">Cuisine</a></li>
                    </ul>
                </div>
                </div>
                <div class="col-auto flex-fill">
                <form role="search">
                    <input class="form-control" type="search" placeholder="Search" aria-label="Search" />
                </form>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Home;