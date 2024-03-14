import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

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
        
        const response = await fetch("http://flip1.engr.oregonstate.edu:9278/new-user", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const new_user = await fetch(`http://flip1.engr.oregonstate.edu:9278/user/${uid}`, {
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
                <input 
                    type="text" 
                    name="username" 
                    id="username" 
                    required
                    onChange={(e) => setUsername(e.target.value)}>
                </input>
                </div>
                <div>
                <label htmlFor="name">Name: </label>
                <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    onChange={(e) => setName(e.target.value)}>
                </input>
                </div>
                <div>
                <label htmlFor="bio">Bio: </label>
                <input 
                    type="text" 
                    name="bio" 
                    id="bio" 
                    onChange={(e) => setBio(e.target.value)}>
                </input>
                </div>
                <div>
                <input type="submit" onClick={newUser} value="Submit"></input>
                </div>
            </form>
        </div>
    )
}

export default UserSetup;