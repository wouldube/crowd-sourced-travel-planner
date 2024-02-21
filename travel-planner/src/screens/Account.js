import React, { useEffect, useState } from 'react';
import {Container, Paper, Grid, Box, Card, Button} from '@mui/material';

const Account = () => {

    // HARDCODED DATA ******************************************

    const [user, setUser] = useState({
        email: '',
        username: '',
        name: '',
        bio: '',
        uid: '',
    });

    // TODO: handle password changes

    useEffect(() => {
        fetch("http://localhost:5000/user/jDBiwhZWfugCoFh6cXOdlZr6ZH13")
        .then(response => response.json())
        .then(user => {
            setUser(user);
            setEmail(user.email);
            setUsername(user.username);
            setName(user.name || '');
            setBio(user.bio || '');
            setUid(user.uid);
        })
        
        .catch(error => console.log(error));
    }, [])

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [uid, setUid] = useState("");

    // *********************************************************

    const updateUser = async (event) => {
        event.preventDefault();
        
        const user = { email, username, name, bio };
        const response = await fetch(`http://localhost:5000/user-info/${uid}`, {
            method: "PUT",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log(await response.json())
    }

    return (
        <Paper>
        <div className="account">
            <h2>My Account</h2>
            <form>
            <div>
                <label htmlFor="email">Email: </label>
                <input 
                    type="email" 
                    name="email" 
                    id="email"
                    value = {email}
                    required
                    onChange={(e) => setEmail(e.target.value)}>
                </input>
            </div>
            <div>
                <label htmlFor="username">Username: </label>
                <input 
                    type="text" 
                    name="username" 
                    id="username" 
                    required
                    value = {username} 
                    onChange={(e) => setUsername(e.target.value)}>
                </input>
            </div>
            <div>
                <label htmlFor="name">Name: </label>
                <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    value = {name} 
                    onChange={(e) => setName(e.target.value)}>
                </input>
                </div>
            <div>
                <label htmlFor="bio">Bio: </label>
                <input 
                    type="text" 
                    name="bio" 
                    id="bio" 
                    value = {bio} 
                    onChange={(e) => setBio(e.target.value)}>
                </input>
            </div>
            <div>
                <input type="submit" onClick={updateUser} value="Submit"></input>
            </div>
            </form>
        </div>
    </Paper>
    )
}

export default Account;