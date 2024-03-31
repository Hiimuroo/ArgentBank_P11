import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserToken, selectAuthError, selectAuthStatus } from './authReducer.js';

function AuthForm() {
    const dispatch = useDispatch();
    const Navigate = useNavigate(); 
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const authError = useSelector(selectAuthError); 
    const authStatus = useSelector(selectAuthStatus); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(getUserToken(credentials));
    };

    useEffect(() => {
        if (authStatus === 'succeeded') {
            Navigate('/user'); 
        }
    }, [authStatus, Navigate]);

    const handleChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <FontAwesomeIcon icon={faUserCircle} className="fa" />
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="email"
                            autoFocus
                            value={credentials.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-remember">
                    <input
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        checked={credentials.rememberMe}
                        onChange={handleChange}
                    />
                    <label htmlFor="rememberMe">Remember me</label> 
                    </div>
                    <button className="sign-in-button" type="submit">Sign In</button>
                    {authStatus === 'failed' && ( //Pas encore actif
                        <span className="errorMessage">{authError}</span>
                    )}
                </form>
            </section>
        </main>
    );
    
}

export default AuthForm;