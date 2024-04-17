import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Grid, Box, Card, CardHeader, CardContent, CardMedia,
    FormControl, FormGroup, FormLabel, TextField, Select, MenuItem,
    Button, ButtonGroup, IconButton, Tooltip, Rating, Divider } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from '@mui/icons-material/EditNote';

const Trip = ({ tripObject, setExpId }) => {
    const [experiences, setExperiences] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const getExperiences = async () => {
            try {
                const data = await fetch(`http://localhost:5000/trip/experiences/${tripObject._id}`)
                const experiences = await data.json()
                setExperiences(experiences)
            } catch (error) { console.error('Error fetching data:', error) }
        }
        getExperiences()
    }, [])

    const deleteTrip = async (tripObject) => {
        try {
            await fetch(`http://localhost:5000/delete-trip/${tripObject._id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(tripObject)
            })
        } catch (error) { console.error('Error Deleting Trip:', error) }
        navigate(`/trips`)
    }

    const goToExperience = (expId) => {
        setExpId(expId)
        navigate(`/experience`)
    }

    return (
        <Container>
            <Paper>
                <h3>{tripObject.title}</h3>
                <Tooltip title="Edit Trip" followCursor>
                    <Button onClick={() => { navigate(`update-trip`) }}>
                        <EditNoteIcon />
                    </Button>
                </Tooltip>
                <Tooltip title="Delete Trip" followCursor>
                    <Button onClick={() => { deleteTrip(tripObject) }}>
                        <DeleteForeverIcon />
                    </Button>
                </Tooltip>
                <Grid container spacing={3}>
                    {experiences.map((exp, index) => (
                        <>
                            {(exp) && (
                                <Grid item key={index} xs={4}>
                                    <Card variant="experience" style={{
                                        backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.3), rgba(117, 207, 235, 0.7)), url(${exp.images[0]})`}}>
                                        <CardContent style={{ height: "150vh", transform: "scale(0.9)" }}>
                                            <h3 style={{ display:"block", width:"100%", height:"100px" }}>{exp.title}</h3>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )}
                        </>
                    ))}
                </Grid>
            </Paper>
        </Container>
    )
}

export default Trip;