import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Paper, Grid, Box, Card, Divider, Chip, Button, FormControl, FormLabel, FormGroup, InputLabel, TextField } from '@mui/material'

const firebase = require("firebase/app")
const { firebaseConfig } = require("../firebase/firebase-config");
const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require("firebase/storage");
const { getAuth, signInWithEmailAndPassword, updateEmail, updatePassword } = require("firebase/auth");


const Account = () => {
    const navigate = useNavigate()

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
    })

    useEffect(() => {

        if (!localStorage.getItem("id")) {
            // localStorage.setItem("path", "/account")
            navigate("/login")
        }

        const id = localStorage.getItem("id")

        fetch(`http://flip1.engr.oregonstate.edu:9278/user-info/${id}`)
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
            user = { username, name, bio, image: downloadURL };
        }

        const response = await fetch(`http://flip1.engr.oregonstate.edu:9278/user-info/${id}`, {
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

                if (OGemail !== email) {
                    console.log(email)
                    updateEmail(currentUser, email)
                    setOGEmail(email)
                    update = { email }
                }
                if (newPass !== "") {
                    updatePassword(currentUser, newPass)
                }

                fetch(`http://flip1.engr.oregonstate.edu:9278/user-info/${id}`, {
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
        <Container>
            {/* <Button onClick={logOut}>Logout</Button> */}

            <Grid container>
                <Grid item xs={12}>
                    <Paper>
                        <form>
                            <FormControl>
                                <Container>
                                    <img src={image} style={{ width: "75px" }} />
                                    <TextField
                                        type="file"
                                        id="image"
                                        accept="image/*"
                                        onChange={(e) => setImage(e.target.value)}
                                    />
                                    <TextField label="name"
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <TextField label="bio"
                                        type="text"
                                        name="bio"
                                        id="bio"
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                    />
                                    <TextField label="username"
                                        type="text"
                                        name="username"
                                        id="username"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <Button variant="contained" type="submit" onClick={updateUser} value="Submit">submit</Button>
                                </Container>
                            </FormControl>
                        </form>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper>

                        <form>
                            <FormControl>
                                <Container>

                                    <FormLabel>Update Email & Password</FormLabel>
                                    <TextField label="email"
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={email}
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <TextField label="password"
                                        type="password"
                                        name="pass"
                                        id="pass"
                                        value={pass}
                                        required
                                        onChange={(e) => setPass(e.target.value)}
                                    />
                                    <TextField label="newPass"
                                        type="password"
                                        name="newPass"
                                        id="newPass"
                                        value={newPass}
                                        onChange={(e) => setNewPass(e.target.value)}
                                    />
                                    <br />
                                    <Button variant="contained" type="submit" onClick={updateEmailandPass} value="Submit">submit</Button>
                                </Container>
                            </FormControl>
                        </form>
                    </Paper>
                </Grid>
            </Grid>

            <Divider />


        </Container >
    )
}

export default Account;