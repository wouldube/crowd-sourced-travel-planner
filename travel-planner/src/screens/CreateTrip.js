import { React, useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Grid, Box, Card, Divider, Chip, Button, FormControl, FormLabel, InputLabel, Input, TextField, CardActions, CardContent, CardHeader } from '@mui/material'

const firebase = require("firebase/app")
const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require("firebase/storage");
const { firebaseConfig } = require("../firebase/firebase-config");

const CreateTrip = (initialExp) => {
    /* Data & Experiences */
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [owner, setOwner] = useState('')
    const [experiences, setExperiences] = useState([])

    const [allExperiences, setAllExperiences] = useState([])

    const fb_app = firebase.initializeApp(firebaseConfig);
    const storage = getStorage(fb_app);

    useEffect(() => {
        if (!localStorage.getItem("id")) {
            // localStorage.setItem("path", "/trips/create-trip")
            navigate("/login")
        }

        const id = localStorage.getItem("id")
        setOwner(id)

        const getExperiences = async () => {
            try {
                console.log(owner)
                const data = await fetch(`http://localhost:5000/my-experiences/${id}`)
                const experiences = await data.json()
                console.log(experiences)

                console.log(initialExp)

                if (initialExp.initialExp) {
                    experiences.unshift(initialExp.initialExp)
                }

                setAllExperiences(experiences)
            } catch (error) { console.error('Error fetching data:', error) }
        }

        getExperiences()
    }, [])

    const addImage = async (newImage) => {
        const imgFile = document.getElementById('image');
        const imgRef = ref(storage, `/trips/${owner}/${newImage}`);
        await uploadBytesResumable(imgRef, imgFile.files[0], { contentType: 'image/png' });
        const downloadURL = await getDownloadURL(imgRef);
        setImage(downloadURL);
    }

    /* CreateTrip Done */
    const SaveTrip = async () => {
        try {
            const trip = { title, description, image, owner, experiences }
            await fetch(`http://localhost:5000/create-trip`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(trip)
            })
        } catch (error) { console.error('Error Saving Trip:', error) }
        navigate(`/trips`)
    }

    /* Navigation */
    const navigate = useNavigate()

    return (
        <Container>
            <form>
                <FormControl>
                    <Paper>
                        New Trip!

                        <Grid container>
                            <Grid item xs={12}>
                                <TextField
                                    id="title" label="Title" type="text" required
                                    value={title} onChange={(e) => { setTitle(e.target.value) }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="description" label="Description" type="text"
                                    value={description} onChange={(e) => setDescription(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="image" label="Image" type="file" accept="image/*"
                                    onChange={(e) => addImage(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit" onClick={SaveTrip}>+</Button>
                    </Paper>
                    <Paper>
                        Add some of your experiences to the trip!
                        <Grid container sizing={3}>
                            {allExperiences.map((exp, index) => (
                                <Grid item key={index} xs={4}>
                                    <Card variant="experience">
                                        <CardContent style={{bottom: "5vh", transform: "scale(0.8)" }}>
                                            <Button style={{bottom: "5vh" }} onClick={() => { setExperiences([...experiences, exp]) }}>+</Button>
                                            <p style={{marginTop: "-5vh" }}>{exp.title}</p>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>

                </FormControl>
            </form>
        </Container>
    )
}

export default CreateTrip;
