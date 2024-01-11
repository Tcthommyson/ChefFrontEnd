import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

// Make a navbar component for users that are signed in and one for users that aren't
// Split this page up into components only later on with the login logic

function Home(props) {
  return (
    <div>
       <nav class="navbar navbar-expand-md navbar-dark bg-dark" aria-label="Fourth navbar example">
        <div class="container-fluid">
        <Link to={'/'} className='navbar-brand'>Pubchef (Logo)</Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        
            <div class="collapse navbar-collapse" id="navbarsExample04">
                <ul class="navbar-nav ms-auto mb-2 mb-md-0">
                <li class="nav-item">
                    <Link to={'/login'} className='nav-link'>Login</Link>
                </li>
                <li class="nav-item">
                    <Link to={'/register'} className='nav-link'>Register</Link>
                </li>
                </ul>
            </div>
            </div>
        </nav>
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