import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

function AuthForm() {

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <FontAwesomeIcon icon={faUserCircle} className="fa" />
                <h1>Sign In</h1>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="email"
                            autoFocus
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                        />
                    </div>
                    <div className="input-remember">
                        <input
                            type="checkbox"
                            id="remember-me"
                        />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button className="sign-in-button">Sign In</button>
            </section>
        </main>
    )
}

export default AuthForm