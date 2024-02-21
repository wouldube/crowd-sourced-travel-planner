import React, { useEffect, useState } from 'react';
import {Container, Paper, Grid, Box, Card, Button} from '@mui/material';
import { useNavigate } from "react-router-dom";

const firebase = require("firebase/app")
const { firebaseConfig } = require("../firebase/firebase-config");
const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require("firebase/storage");
const { getAuth, signInWithEmailAndPassword, updateEmail, updatePassword } = require("firebase/auth");


const Account = () => {

    const navigate = useNavigate();

    const fb_app = firebase.initializeApp(firebaseConfig);
    const storage = getStorage(fb_app)
    const auth = getAuth(fb_app);

    const [user, setUser] = useState({
        email: '',
        username: '',
        name: '',
        bio: '',
        profile_img: null,
        id: '',
    });

    useEffect(() => {

        if (!localStorage.getItem("id")) {
            // localStorage.setItem("path", "/account")
            navigate("/login")
        }

        const id = localStorage.getItem("id")

        fetch(`http://localhost:5000/user-info/${id}`)
        .then(response => response.json())
        .then(user => {
            setUser(user);
            setOGEmail(user.email);
            setEmail(user.email);
            setUsername(user.username);
            setName(user.name || '');
            setBio(user.bio || '');
            setImage(user.profile_img || '')
            setId(id);
        })
        
        .catch(error => console.log(error));
    }, [])

    const [email, setEmail] = useState("");
    const [OGemail, setOGEmail] = useState("");
    const [pass, setPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [image, setImage] = useState("");
    const [id, setId] = useState("");

    // *********************************************************

    const updateUser = async (event) => {
        event.preventDefault();   
        let user = { username, name, bio };

        if (image) {
            const imgFile = document.getElementById('image');
            const profilePic = ref(storage, `/users/${id}/profile.jpg`)
            await uploadBytesResumable(profilePic, imgFile.files[0], { contentType: 'image/png' })
            const downloadURL = await getDownloadURL(profilePic)
            console.log(downloadURL)
            // const imgRef = ref(storage, image);
            // const upload = await uploadBytesResumable(`${id}/${imgRef}`, imgFile.files[0], { contentType: 'image/png' })
            // const downloadURL = await getDownloadURL(`${id}/${imgRef}`);
            setImage(downloadURL)
            user = { username, name, bio, image:downloadURL };
        }

        const response = await fetch(`http://localhost:5000/user-info/${id}`, {
            method: "PUT",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log(await response.json())
    }

    const updateEmailandPass = async (event) => {
        event.preventDefault();
        console.log(email)
        let update = {}

        signInWithEmailAndPassword(auth, OGemail, pass)
            .then(() => {
                console.log("auth")
                const currentUser = auth.currentUser;

                if (OGemail !== email){
                    console.log(email)
                    updateEmail(currentUser, email)
                    setOGEmail(email)
                    update = { email }
                }
                if (newPass !== "") {
                    updatePassword(currentUser, newPass)
                }

                fetch(`http://localhost:5000/user-info/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(update),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
            })
            .catch((error) => {
                console.log(error)
                return
            })
    }

    const logOut = () => {

        localStorage.removeItem("id")
        navigate("/")

    }

    // *********************************************************

    return (
        <Paper>
        <div className="account">
            <h2>My Account</h2>
            <form>
                <h3>Update Email and Password</h3>
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
                <label htmlFor="pass">Current Password: </label>
                <input 
                    type="password" 
                    name="pass" 
                    id="pass"
                    value = {pass}
                    required
                    onChange={(e) => setPass(e.target.value)}>
                </input>
                </div>
                <div>
                <label htmlFor="newPass">New Password: </label>
                <input 
                    type="password" 
                    name="newPass" 
                    id="newPass"
                    value = {newPass}
                    onChange={(e) => setNewPass(e.target.value)}>
                </input>
                </div>
                <div>
                <input type="submit" onClick={updateEmailandPass} value="Submit"></input>
            </div>
            </form>
            <form>
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
            <div className="image">
                <img src={image} style={{width:"75px"}}/>
                <label htmlFor="image">Profile Pic:</label><br/>
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.value)}
                />
            </div>
            <div>
                <input type="submit" onClick={updateUser} value="Submit"></input>
            </div>
            </form>
            <div>
                <button onClick={logOut}>Logout</button>
            </div>
        </div>
    </Paper>
    )
}

export default Account;