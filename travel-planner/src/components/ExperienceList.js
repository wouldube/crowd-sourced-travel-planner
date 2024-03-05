import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Grid, Box, Card, Button } from '@mui/material'
import ReviewModal from './ReviewModal.js';

const ExperienceList = ({setExpId}) => {

    const [experiences, setAllExperiences] = useState([]);
    const [visibleReviewModal, setVisibleReviewModal] = useState(false);
    const [reviewExpId, setReviewExpId] = useState();


    const navigate = useNavigate()

    useEffect(() => {
        fetch("http://localhost:5000/experiences")
            .then(response => response.json())
            .then(experiences => setAllExperiences(experiences))
            .catch(error => console.error('Error fetching data:', error));
    }, [])

    const goToExperience = (expId) => {
        setExpId(expId)
        console.log(expId)
        navigate(`/experience`)
    }

    // Review
    const handleReviewModal = (event, expId) => {
        event.stopPropagation()
        setReviewExpId(expId)
        setVisibleReviewModal(true)
    }
    
    const handleCloseReviewModal = (event) => {
        setVisibleReviewModal(false)
    }

    return (
        <Container>
            <strong>More Experiences to Explore...</strong>
            <Grid container spacing={3}>
                {experiences.map((allexp) => (
                    <Grid item xs={6}>
                    <Card onClick={() => {goToExperience(allexp._id)}}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <img src={allexp.image} alt=" "></img>
                            </Grid>
                            <Grid item xs={12}>
                                <strong>{allexp.title}</strong>
                            </Grid>
                            <Grid item xs={12}>
                                {allexp.location.coordinates[0]}, {allexp.location.coordinates[1]}
                            </Grid>
                            <Grid item xs={12}>
                                Posted By: {allexp.owner}
                            </Grid>
                            <Grid item xs={12}>
                                {/* {allexp.reviews} */}
                            </Grid>
                            <Grid item xs={12}>
                                <div className="ratingImage">
                                    <img src="https://media.istockphoto.com/id/1306258842/photo/5-or-five-stars-sign-symbol-on-white-background-illustration-ranking-quality-service-review.jpg?s=612x612&w=0&k=20&c=PLhPtCoPZSUM9FSg9CAmTC_7b4WoHMYdaDHas64kg6M=" alt=" " />
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                {allexp.description}
                            </Grid>
                            <Grid item xs={12}>
                                <button 
                                    onClick={(event)=>{handleReviewModal(event, allexp._id)}}
                                >
                                    Review
                                </button>
                            </Grid>
                        </Grid>
                    </Card>
                    </Grid>
                ))}
            </Grid>
            {!!visibleReviewModal && 
            <ReviewModal 
                expId={reviewExpId}
                onClose={handleCloseReviewModal}
            ></ReviewModal>}
        </Container>
    )
}

export default ExperienceList;

