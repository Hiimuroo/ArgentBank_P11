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
        rememberMe: false,
    });
    const authError = useSelector(selectAuthError); 
    const authStatus = useSelector(selectAuthStatus); 

    useEffect(() => {
        // Récupération des informations d'identification du stockage local lors du chargement initial
        const storedCredentials = localStorage.getItem('credentials');
        if (storedCredentials) {
            setCredentials(JSON.parse(storedCredentials));
        }
    }, []);

    useEffect(() => {
        // Rediriger vers la page `/user` lorsque l'état `authStatus` passe à `'succeeded'`
        if (authStatus === 'succeeded') {
            Navigate('/user');
        }
    }, [authStatus, Navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Stockage des informations d'identification dans le stockage local si Remember Me est coché
        if (credentials.rememberMe) {
            localStorage.setItem('credentials', JSON.stringify(credentials));
        } else {
            localStorage.removeItem('credentials');
        }
        await dispatch(getUserToken(credentials));
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;

        setCredentials({
            ...credentials,
            [name]: newValue,
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
                    {authStatus === 'failed' && (
                        <span className="errorMessage">{authError}</span>
                    )}
                </form>
            </section>
        </main>
    );
}

export default AuthForm;
