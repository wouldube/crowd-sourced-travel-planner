import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Paper, Grid, Box, Card, CardHeader, CardContent, CardMedia,
    FormControl, FormGroup, FormLabel, TextField, Select, MenuItem,
    Button, ButtonGroup, IconButton, Tooltip, Rating, Divider } from '@mui/material';

const firebase = require("firebase/app")
const { firebaseConfig } = require("../firebase/firebase-config");
const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");

const UserSetup = ({email, pass}) => {

    const navigate = useNavigate();

    const fb_app = firebase.initializeApp(firebaseConfig);
    const auth = getAuth(fb_app);

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");

    const authenticateUser = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, pass)
            return userCredential.user.uid

        } catch(error) {
            console.log(error);
            return
        }
    }

    const newUser = async (event) => {
        event.preventDefault();

        const uid = await authenticateUser()
        // console.log(uid)

        let user = { uid, email, username, name, bio };

        // Upload Profile Image to Firebase
        
        const response = await fetch("http://localhost:5000/new-user", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const new_user = await fetch(`http://localhost:5000/user/${uid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await new_user.json()
        localStorage.setItem('id', result._id)

        // if (localStorage.getItem('path')) {
        //     navigate(localStorage.getItem('path'))
        // }

        navigate("/");
    }

    return (
        <div className="user-setup">
            <h2>More Information</h2>
            <form>
                <div>
                <label htmlFor="username">Username: </label>
                <TextField 
                    type="text" 
                    name="username" 
                    id="username" 
                    required
                    onChange={(e) => setUsername(e.target.value)}>
                </TextField>
                </div>
                <div>
                <label htmlFor="name">Name: </label>
                <TextField 
                    type="text" 
                    name="name" 
                    id="name" 
                    onChange={(e) => setName(e.target.value)}>
                </TextField>
                </div>
                <div>
                <label htmlFor="bio">Bio: </label>
                <TextField 
                    type="text" 
                    name="bio" 
                    id="bio" 
                    onChange={(e) => setBio(e.target.value)}>
                </TextField>
                </div>
                <div>
                <TextField type="submit" onClick={newUser} value="Submit"></TextField>
                </div>
            </form>
        </div>
    )
}

export default UserSetup;