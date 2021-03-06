import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from './firebase';
import './Login.css';

function Login() {

    const history = useHistory();
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const login = e => {
        e.preventDefault();//stops refresh
        auth.signInWithEmailAndPassword(email, password)
        .then((auth) => {
            history.push("/");
        })
        .catch(e => alert(e.message));
    }

    const register = e => {
        e.preventDefault();//stops refreshing
        auth.createUserWithEmailAndPassword(email, password)
        .then(auth => {
            history.push("/");
        })
        .catch(e => alert(e.message));
    }

    return (
        <div className="login">
            <Link to="/">
                <img className="login__logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
                    alt=""
                />
            </Link>
            <div className="login__container">
                <h1>Sign in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" />
                    <h5>Password</h5>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
                    <button onClick={login} type="submit" className="login__signInButton">Sign In</button>
                </form>
                <p>By clicking this button you agree to our terms and conditions</p>
                <button onClick={register} className="login__registerButton">Create your Amazon account</button>
            </div>
        </div>
    )
}

export default Login
