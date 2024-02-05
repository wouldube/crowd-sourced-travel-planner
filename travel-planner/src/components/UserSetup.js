import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const UserSetup = ({uid, email}) => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");

    const newUser = async (event) => {
        event.preventDefault();
        
        const user = { uid, email, username, name, bio };
        const response = await fetch("http://localhost:5000/new-user", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        });

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
                    required
                    onChange={(e) => setName(e.target.value)}>
                </input>
                </div>
                <div>
                <label htmlFor="bio">Bio: </label>
                <input 
                    type="text" 
                    name="bio" 
                    id="bio" 
                    required
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