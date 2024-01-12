import React from 'react';
import DefNav from './Navbars/DefNav';
import AuthNav from './Navbars/AuthNav';
import './Home.css'

// Make a navbar component for users that are signed in and one for users that aren't
// Split this page up into components only later on with the login logic

function Home(props) {
  return (
    <div>
       {/*<DefNav></DefNav>*/}
       <AuthNav></AuthNav>
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