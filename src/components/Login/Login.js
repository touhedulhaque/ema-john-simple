import React, { useState } from 'react';
import './login.css'
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, handleFbLogin, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';



function Login() {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        password: ''
    })

    initializeLoginFramework();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponses(res, true)
            })
    }

    const fbLogin = () => {
        handleFbLogin()
            .then(res => {
                handleResponses(res, true)
            })
    }

    const signOut = () => {
        handleSignOut()
            .then(res => {
                handleResponses(res, false)
            })
    }

    const handleResponses = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from)
        }
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            // [...Cart, newItem]
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo)
        }
    }
    const handleSubmit = (e) => {
        // console.log(user.email, user.password)
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handleResponses(res, true)
                })
        }

        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponses(res, true)
                })
        }
        e.preventDefault();
    }


    return (
        <div className="main">
            <div className="margin">
                {
                    user.isSignedIn ? <div class="wrap">
                        <button class="button" onClick={signOut}>Sign Out</button>
                    </div>
                        : <div class="wrap">
                            <button class="button" onClick={googleSignIn}>Sign In via GMAIL</button>
                        </div>
                } <br />

                <button onClick={fbLogin} class="button">Sign in via Facebook</button>

                {
                    user.isSignedIn && <div>
                        <p>Welcome <strong>{user.name}</strong> </p>
                        <p>Your Signed-In email: {user.email}</p>
                        <img style={{ width: '150px', borderRadius: '100px' }} src={user.photo} alt="" />
                    </div>
                }

                <h1>Our Own Authentication</h1>
                <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
                <label htmlFor="newUser">New User Sign Up</label><br />

                <form onSubmit={handleSubmit}>
                    {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="User Name" />}<br />
                    <input type="text" onBlur={handleBlur} name="email" placeholder="Email" required /><br />
                    <input type="password" onBlur={handleBlur} name="password" placeholder="Password" required /><br />
                    <input type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
                </form>
                <p style={{ color: 'red' }}>{user.error}</p>
                {
                    user.success && <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'Logged In'} Successfully</p>
                }
            </div>

        </div>
    );
}

export default Login;
