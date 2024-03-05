import { React, useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Grid, Box, Card, Divider, Chip, Button, FormControl, FormLabel, InputLabel, Input, TextField } from '@mui/material'


const UpdateTrip = ({ tripObject }) => {
    const [title, setTitle] = useState(tripObject.title)
    const [description, setDescription] = useState(tripObject.description)
    const [image, setImage] = useState(tripObject.image)
    const [experiences, setExperiences] = useState([])

    const [allExperiences, setAllExperiences] = useState([]);

    const navigate = useNavigate()

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
                setAllExperiences(experiences)
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

    /* Navigation */


    return (
        <Container>
            <Card>
                <form>
                    <FormControl>
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
                                    onChange={(e) => setImage(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit" onClick={SaveTrip}>Update</Button>
                        Add some of your experiences to the trip!
                        <Grid container sizing={3}>
                            {allExperiences.map((exp, index) => (
                                <Grid item key={index} xs={4}>
                                    <Card variant="experience">
                                        <h3>{exp.title}</h3>
                                        <Button onClick={() => { setExperiences([...experiences, exp]) }}>+</Button>
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





