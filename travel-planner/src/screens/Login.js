import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Paper, Grid, Box, Card, Divider, Chip, Button, FormControl, FormLabel, InputLabel, TextField, Select, option } from '@mui/material'

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
        <Container id="log-in">
            <h2>Login</h2>
            <form>
                <FormControl>
                    <TextField label="email"
                        type="email"
                        name="email"
                        id="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField label="passsword"
                        type="password"
                        name="pass"
                        id="pass"
                        required
                        onChange={(e) => setPass(e.target.value)}
                    />
                    <Button type="submit" onClick={authLogin}>Login</Button>
                </FormControl>
            </form>
            <Button onClick={() => { navigate(`/register`) }}>Create an Account</Button>
        </Container>
    )
}

export default Login;
