import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOut } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {

  return (
    <nav className="main-nav">
      <a className="main-nav-logo" href="/">
        <img
          className="main-nav-logo-image"
          src="../argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      <div>
          <>
            <a className="main-nav-item" href="/user">
              <FontAwesomeIcon icon={faUserCircle} className="fa" />
            </a>
            <a className="main-nav-item" href='/'>
              <FontAwesomeIcon icon={faSignOut} className="fa" />
              Sign Out
            </a>
          </>
          <a className="main-nav-item" href="/sign-in">
            <FontAwesomeIcon icon={faUserCircle} className="fa" />
            Sign In
          </a>
      </div>
    </nav>
  );
}

export default Navbar;
