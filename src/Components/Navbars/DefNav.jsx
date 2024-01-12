import React from 'react';
import { Link } from 'react-router-dom';

function DefNav() {
  return (
    <div>
      <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top" aria-label="Fourth navbar example">
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
    </div>
  );
}

export default DefNav;