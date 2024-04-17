import { React, useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container, Paper, Grid, Box, Card, CardHeader, CardContent, CardMedia,
    FormControl, FormGroup, FormLabel, TextField, Select, MenuItem,
    Button, ButtonGroup, IconButton, Tooltip, Rating, Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const firebase = require("firebase/app")
const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require("firebase/storage");
const { firebaseConfig } = require("../firebase/firebase-config");

const UpdateTrip = ({ tripObject }) => {
    const [title, setTitle] = useState(tripObject.title)
    const [description, setDescription] = useState(tripObject.description)
    const [image, setImage] = useState(tripObject.image)
    const [experiences, setExperiences] = useState(tripObject.experiences)

    const [favoriteExperiences, setFavoriteExperiences] = useState([]);

    const navigate = useNavigate()

    const fb_app = firebase.initializeApp(firebaseConfig);
    const storage = getStorage(fb_app);

    if (!localStorage.getItem("id")) {
        navigate("/login")
    }

    const id = localStorage.getItem("id")

    const getFavoriteExperiences = async () => {
        try {
            const data = await fetch(`http://localhost:5000/my-favorites/${id}`)
            const favoriteExperiences = await data.json()
            let filterExperiences = []

            for (let i = 0; i <= favoriteExperiences.length; i++) {
                filterExperiences = favoriteExperiences.filter(exp => !tripObject.experiences.includes(exp));
            }

            setFavoriteExperiences(filterExperiences)
            console.log(filterExperiences)
        } catch (error) { console.error('Error fetching data:', error) }
    }

    useEffect(() => {
        getFavoriteExperiences()
    }, [])

    /* UpdateTrip Done */
    const SaveTrip = async (event) => {
        event.preventDefault();

        try {
            const trip = {
                title: title,
                description: description,
                image: image,
                experiences: experiences
            }
            await fetch(`http://localhost:5000/update-trip/${tripObject._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(trip)
            })
        } catch (error) { console.error('Error Saving Trip:', error) }
        navigate(`/trips`)
    }

    const addImage = async (newImage) => {
        const imgFile = document.getElementById('image');
        const imgRef = ref(storage, `/trips/${tripObject.owner}/${newImage}`);
        await uploadBytesResumable(imgRef, imgFile.files[0], { contentType: 'image/png' });
        const downloadURL = await getDownloadURL(imgRef);
        setImage(downloadURL);
    }

    return (
        <Container>
            <Paper>
                <form>
                    <FormControl>
                        <h2>Update your current trip!</h2>
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
                            <Grid item xs={12}>
                                <Button type="submit" onClick={SaveTrip}>Update</Button>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <h2>Experiences</h2>
                            </Grid>
                            <Grid item xs={6}>
                                <h3>The Trip's Experiences<br />
                                    (preselected ones)</h3>
                                <Grid container spacing={3}>
                                    {experiences.map((exp, index) => (
                                        <Grid item key={index} xs={4}>
                                            <Card variant="experience" style={{
                                                // backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.3), rgba(117, 207, 235, 0.7)), url(${exp.images[0]})`
                                            }}>
                                                <CardContent>
                                                    <p>{exp.title}</p>
                                                    <Tooltip title="Remove from Trip" followCursor>
                                                        <Button onClick={() => {
                                                            setExperiences(experiences.filter(experience => experience !== exp))
                                                            setFavoriteExperiences([...favoriteExperiences, exp])
                                                        }}>
                                                            -
                                                        </Button>
                                                    </Tooltip>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <h3>Add new ones from your favorite<br />
                                    experiences to the trip!</h3>
                                <Grid container spacing={3}>
                                    {favoriteExperiences.map((exp, index) => (
                                        <Grid item key={index} xs={4}>
                                            <Card variant="experience">
                                                <Grid container>
                                                    <Grid item xs={12}>
                                                        <p>{exp.title}</p>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Tooltip title="Add to Trip" followCursor>
                                                            <Button onClick={() => {
                                                                setExperiences([...experiences, exp]);
                                                                setFavoriteExperiences(favoriteExperiences.filter(experience => experience !== exp))
                                                            }}>
                                                                <AddIcon />
                                                            </Button>
                                                        </Tooltip>
                                                    </Grid>
                                                </Grid>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        </Grid >
                    </FormControl >
                </form >
            </Paper >
        </Container >
    )
}

export default UpdateTrip;





