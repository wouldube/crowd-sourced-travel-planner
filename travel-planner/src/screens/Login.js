import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const firebase = require("firebase/app")
const { firebaseConfig } = require("../firebase/firebase-config");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

const Login = () => {

    const navigate = useNavigate();

    const fb_app = firebase.initializeApp(firebaseConfig);
    const auth = getAuth(fb_app);

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const authLogin = async (event) => {
        event.preventDefault();

        let uid = "";

        signInWithEmailAndPassword(auth, email, pass)
            .then(async (userCredential) => {
                // Signed in
                uid = userCredential.user.uid;

                // DEBUG
                const response = await fetch(`http://localhost:5000/user/${uid}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const result = await response.json()
                console.log(result._id)
                localStorage.setItem('id', result._id)

                // if (localStorage.getItem('path')) {
                //     navigate(localStorage.getItem('path'))
                // }

                navigate("/");
            })
            .catch((error) => {
                console.log(error)
                return
            })
    }

    return (
        <div id="login">
            <h2>Login</h2>
            <form>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        required
                        onChange={(e) => setEmail(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="pass">Password: </label>
                    <input 
                        type="password" 
                        name="pass" 
                        id="pass" 
                        required
                        onChange={(e) => setPass(e.target.value)}>
                    </input>
                </div>
                <div>
                    <input type="submit" value="Login" onClick={authLogin}></input>
                </div>
            </form>
            <div>
                <button onClick={() => {navigate(`/register`)}}>Create an Account</button>
            </div>
        </div>
    )
}

export default Login;
