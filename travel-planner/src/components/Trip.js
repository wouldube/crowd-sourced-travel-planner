import { React, useEffect, useState, } from 'react';
import TripExperience from "./TripExperience";
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Grid, Box, Card, Divider, Chip, Button } from '@mui/material';

const Trip = ({tripObject}) => {
    /* Trip Data & Experiences */
    const [experiences, setExperiences] = useState([]);
    
    useEffect( () => { 
        const getExperiences = async() => {
            try {
            const data = await fetch(`http://localhost:5000/trip/experiences/${tripObject._id}`)
            const experiences = await data.json()
            setExperiences(experiences)
            } catch(error) { console.error('Error fetching data:', error) }
        }
        getExperiences() }, [])

    /* Adjustments */
    const deleteTrip = async () => {
        try {
            await fetch(`http://localhost:5000/delete-trip/${tripObject._id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(tripObject)
            })
        } catch(error) { console.error('Error Deleting Trip:', error) }
        navigate(`/trips`)
    }
    
    /* Navigation */
    const [component, which] = useState(0);
    const navigate = useNavigate()

    return (
        <Container>
        <div className="TripMap">
            <h3>{tripObject.title}</h3>
            <Button onClick={() => {navigate(`update-trip`)}}>Edit?</Button>
            <Button onClick={() => {deleteTrip()}}>Delete!</Button>
            {component === 0 && (
                <>
                {experiences.map((exp, index) => (
                    <div key={index} className="TripsTrip">
                        <Button onClick={()=>which(1)}>{exp.title}</Button>
                        <p>{exp.description}</p>
                    </div>
                ))}
                </>
            )}
            {component === 1 && (
                <>
                <TripExperience/>
                <Button onClick={()=>which(0)}>X</Button>
                </>
            )}
        </div>
        </Container>
    )
}

export default Trip;