import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, emptyUserData, getUserData } from '../../Contents/userReducer';

const Navbar = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const { userName } = useSelector(getUserData);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserData(token));
    }
  }, [dispatch, token]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    dispatch(emptyUserData());
  };

  return (
    <nav className="main-nav">
      <a className="main-nav-logo" href="/">
        <img
          className="main-nav-logo-image"
          src="../argentBankLogo.webp"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      <div>
        {token ? (
          <>
            <a className="main-nav-item" href="/user">
              <FontAwesomeIcon icon={faUserCircle} className="fa" />
              {userName && <span>{userName}</span>}
            </a>
            <a className="main-nav-item" onClick={handleSignOut} href='/'>
              <FontAwesomeIcon icon={faSignOut} className="fa" />
              Sign Out
            </a>
          </>
        ) : (
          <a className="main-nav-item" href="/sign-in">
            <FontAwesomeIcon icon={faUserCircle} className="fa" />
            Sign In
          </a>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
