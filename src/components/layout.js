import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/nav.css';

export function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white box-shadow py-4">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Inventory Manager</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav   mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link text-dark" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-orange" to="/products">Products</Link>
        </li>

      </ul>
    </div>
  </div>
</nav>
  );
}

/*FOOTER*/
export function Footer(){
    return(
        <footer>
            <div className='container p-3 mt-5 border-top'>
                <small className='d-block text-muted text-center'>&copy; 2023-Inventory Manager</small>
            </div>
        </footer>

    );
}
