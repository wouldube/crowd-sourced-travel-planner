import { React, useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Grid, Box, Card, CardHeader, CardContent, CardMedia,
    FormControl, FormGroup, FormLabel, TextField, Select, MenuItem,
    Button, ButtonGroup, IconButton, Tooltip, Rating, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
const firebase = require("firebase/app")
const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require("firebase/storage");
const { firebaseConfig } = require("../firebase/firebase-config");

const UpdateTrip = ({ tripObject }) => {
    const [title, setTitle] = useState(tripObject.title)
    const [description, setDescription] = useState(tripObject.description)
    const [image, setImage] = useState(tripObject.image)
    const [experiences, setExperiences] = useState([])

    const [allExperiences, setAllExperiences] = useState([]);

    const navigate = useNavigate()

    const fb_app = firebase.initializeApp(firebaseConfig);
    const storage = getStorage(fb_app);

    useEffect(() => {
        if (!localStorage.getItem("id")) {
            // localStorage.setItem("path", "trips/trip/update-trip")
            navigate("/login")
        }

        const id = localStorage.getItem("id")

        const getExperiences = async () => {
            try {
                const data = await fetch(`http://localhost:5000/my-experiences/${id}`)
                const experiences = await data.json()
                const exp_ids  = []

                for (let i = 0; i < experiences.length; i++) {
                    exp_ids.push(experiences[i]._id)
                }

                console.log(tripObject.experiences)
                for (let i = 0; i < tripObject.experiences.length; i++) {
                    if (exp_ids.indexOf(tripObject.experiences[i]) < 0) {
                        let expData = await fetch(`http://localhost:5000/experiences/${tripObject.experiences[i]}`)
                        let exp = await expData.json()
                        experiences.push(exp)
                    }
                }

                setAllExperiences(experiences)
                console.log(experiences)
            } catch (error) { console.error('Error fetching data:', error) }
        }

        getExperiences()
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

    /* Navigation */


    return (
        <Container>
            <Card>
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
                        </Grid>
                        <Button type="submit" onClick={SaveTrip}>Update</Button>
                        <br></br>
                        <h2>Add some of your experiences to the trip!</h2>
                        <Grid container spacing={3}>
                            {allExperiences.map((exp, index) => (
                                <Grid item key={index} xs={4}>
                                    {/* <Card variant="experience" style={{
                                        backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.3), rgba(117, 207, 235, 0.7)), url(${exp.images[0]})`
                                    }}>
                                        <Container><h3>{exp.title}</h3></Container>
                                        <Button onClick={() => { setExperiences([...experiences, exp]) }}>+</Button>
                                    </Card> */}
                                    <Card variant="experience" style={{
                                        backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.3), rgba(117, 207, 235, 0.7)), url(${exp.images[0]})`}}>
                                        <CardContent style={{ height: "150vh", transform: "scale(0.9)" }}>
                                            <h2 style={{ display:"block", width:"100%", height:"100px" }}>{exp.title}</h2>
                                            <Tooltip title="Add to Trip" followCursor>
                                                <Button>
                                                    <AddIcon onClick={() => { setExperiences([...experiences, exp]) }}/>
                                                </Button>
                                            </Tooltip>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </FormControl>
                </form>
            </Card>
        </Container>
    )
}

export default UpdateTrip;





