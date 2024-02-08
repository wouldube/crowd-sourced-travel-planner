import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Account = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        username: '',
        name: '',
        bio: '',
        id: '',
    });

    // TODO: handle password changes

    useEffect(() => {

        if (localStorage.getItem("id") === null) {
            // localStorage.setItem("path", "/account")
            navigate("/login")
        }

        const id = localStorage.getItem("id")

        fetch(`http://localhost:5000/user-info/${id}`)
        .then(response => response.json())
        .then(user => {
            setUser(user);
            setEmail(user.email);
            setUsername(user.username);
            setName(user.name || '');
            setBio(user.bio || '');
            setId(id);
        })
        
        .catch(error => console.log(error));
    }, [])

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [id, setId] = useState("");

    // *********************************************************

    const updateUser = async (event) => {
        event.preventDefault();
        
        const user = { email, username, name, bio };
        const response = await fetch(`http://localhost:5000/user-info/${id}`, {
            method: "PUT",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log(await response.json())
    }

    return (
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
    )
}

export default Account;