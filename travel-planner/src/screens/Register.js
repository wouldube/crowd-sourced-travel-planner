import React, { useState } from 'react';
import UserSetup from '../components/UserSetup.js';

const Register = () => {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirm, setConfirm] = useState("");
    const [uid, setUid] = useState("");

    const createUser = async (event) => {
        event.preventDefault();

        if (pass !== confirm) {
            const error = document.getElementById("password-error")
            error.style.visibility = "visible"
            return
        }

        const hide = document.getElementById("sign-up")
        hide.style.visibility = "hidden"

        const show = document.getElementById("setup")
        show.style.visibility = "visible"

    }

    return (
        <div>
        <div id="sign-up">
        <div id="password-error" style={{visibility: "hidden"}}>
            <span>Passwords do not match.</span>
        </div>
        <div id="email-error" style={{visibility: "hidden"}}>
            <span>An account with this email already exists.</span>
        </div>
        <div id="inputs">
        <form>
            <h2>Create Account</h2>
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
            <label htmlFor="confirm">Confirm Password: </label>
            <input 
                type="password" 
                name="confirm" 
                id="confirm" 
                required
                onChange={(e) => setConfirm(e.target.value)}>
            </input>
            </div>
            <div>
            <input type="submit" onClick={createUser} value="Create Account"></input>
            </div>
        </form>
        </div>
        </div>
        <div id="setup" style={{visibility: "hidden"}}>
            <UserSetup 
                uid={uid} 
                setUid={setUid}
                email={email} 
                pass={pass}
            />
        </div>
        </div>
    )
}

export default Register;