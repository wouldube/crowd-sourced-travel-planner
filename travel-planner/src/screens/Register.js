import React, { useState } from 'react';
import UserSetup from '../components/UserSetup.js';
import { Container, Paper, Grid, Box, Card, Divider, Chip, Button, FormControl, FormLabel, InputLabel, TextField, Select, option } from '@mui/material'

const Register = () => {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirm, setConfirm] = useState("");

    const createUser = async (event) => {
        event.preventDefault();

        if (pass !== confirm) {
            const error = document.getElementById("password-error")
            error.style.display = "block"
            return
        }

        const hide = document.getElementById("sign-up")
        hide.style.display = "none"

        const show = document.getElementById("setup")
        show.style.display = "block"

    }

    return (
        <Container>
            <div id="sign-up">
                <div id="password-error" style={{ display: "none" }}>
                    <span>Passwords do not match.</span>
                </div>
                <div id="inputs">
                    <form>
                        <FormControl>
                            <FormLabel>Create Account</FormLabel>
                            <TextField label="email"
                                type="email"
                                name="email"
                                id="email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField label="password"
                                type="password"
                                name="pass"
                                id="pass"
                                required
                                onChange={(e) => setPass(e.target.value)}
                            />
                            <TextField label="confirm password"
                                type="password"
                                name="confirm"
                                id="confirm"
                                required
                                onChange={(e) => setConfirm(e.target.value)}
                            />
                            <Button type="submit" onClick={createUser}>Create Account</Button>
                        </FormControl>
                    </form>
                </div>
            </div>
            <div id="setup" style={{ display: "none" }}>
                <UserSetup
                    // uid={uid} 
                    // setUid={setUid}
                    email={email}
                    pass={pass}
                />
            </div>
        </Container>
    )
}

export default Register;