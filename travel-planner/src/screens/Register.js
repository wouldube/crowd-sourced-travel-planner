import React, { useState } from 'react';
import UserSetup from '../components/UserSetup.js';
import {
    Container, Paper, Grid, Box, Card, CardHeader, CardContent, CardMedia,
    FormControl, FormGroup, FormLabel, TextField, Select, MenuItem,
    Button, ButtonGroup, IconButton, Tooltip, Rating, Divider
} from '@mui/material';
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
            <Paper>
                <h2>Create an Account</h2>
                <div id="sign-up">
                    <div id="password-error" style={{ display: "none" }}>
                        <span>Passwords do not match.</span>
                    </div>
                    <div id="inputs">
                        <form>
                            <FormControl>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <TextField name="email" id="email"
                                            label="email" type="email"
                                            required
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField name="pass" id="pass"
                                            label="password" type="password"
                                            required
                                            onChange={(e) => setPass(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField name="confirm" id="confirm"
                                            label="confirm password" type="password"
                                            required
                                            onChange={(e) => setConfirm(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button type="submit" onClick={createUser}>Create Account</Button>
                                    </Grid>
                                </Grid>
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
            </Paper>
        </Container>
    )
}

export default Register;