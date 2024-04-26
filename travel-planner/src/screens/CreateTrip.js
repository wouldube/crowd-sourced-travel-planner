import { React, useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Grid, Box, Card, CardHeader, CardContent, CardMedia,
    FormControl, FormGroup, FormLabel, TextField, Select, MenuItem,
    Button, ButtonGroup, position, IconButton, Tooltip, Rating, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
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
                        <h2>Create a new trip!</h2>

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
                        <Button type="submit" onClick={SaveTrip}>Create Trip</Button>
                    </Paper>
                    <Paper>
                        <h2>Add some of your experiences to the trip!</h2>
                        <Grid container spacing={3}>
                            {allExperiences.map((exp, index) => (
                                <Grid item key={index} xs={4}>
                                    <Card variant="experience" style={{
                                        backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.3), rgba(117, 207, 235, 0.7)), url(${exp.images[0]})`
                                    }}>
                                        <CardContent>
                                            <h2>{exp.title}</h2>
                                            <Tooltip title="Add to Trip" followCursor>
                                                <Button>
                                                    <AddIcon onClick={() => { setExperiences([...experiences, exp]) }}/>
                                                </Button>
                                            </Tooltip>
                                            {/* <Button style={{ height: "150vh"}} onClick={() => { setExperiences([...experiences, exp]) }}>+</Button> */}
                                            {/* <p style={{ marginTop: "-5vh" }}>{exp.title}</p> */}
                                            {/* <CardMedia image='exp.images[0]'/> */}
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
