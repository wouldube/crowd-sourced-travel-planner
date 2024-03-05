import { React, useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Grid, Box, Card, Divider, Chip, Button, FormControl, FormLabel, InputLabel, Input, TextField } from '@mui/material'

const CreateTrip = (initialExp) => {
    /* Data & Experiences */
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [owner, setOwner] = useState('')
    const [experiences, setExperiences] = useState([])

    const [allExperiences, setAllExperiences] = useState([])

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
                    <Grid container spacing={2}>
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

                    <Button type="submit" onClick={SaveTrip}>Create</Button>
                    <Divider/>
                    <Divider/>
                    <Divider/>
                    Add some of your experiences to the trip!
                    <Grid container sizing={3}>
                        {allExperiences.map((exp) => (
                            <Grid item xs={4}>
                                <Card variant="experience">
                                    <h3>{exp.title}</h3>
                                    <p>{exp.description}</p>
                                    <Button onClick={() => { setExperiences([...experiences, exp]) }}>ADD!!</Button>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </FormControl>
            </form>
        </Container>
    )
}

export default CreateTrip;
