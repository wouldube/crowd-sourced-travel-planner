import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Grid, Box, Card, Button } from '@mui/material'
import ReviewModal from './ReviewModal.js';

const ExperienceList = ({setExpId}) => {
    const [experiences, setAllExperiences] = useState([]);

    const [visibleReviewModal, setVisibleReviewModal] = useState(false);
    const [reviewExpId, setReviewExpId] = useState();
    const [modalStyle, setModalStyle] = useState({});



    const navigate = useNavigate()

    useEffect(() => {
        fetch("http://localhost:5000/experiences")
            .then(response => response.json())
            .then(experiences => setAllExperiences(experiences))
            .catch(error => console.error('Error fetching data:', error));
    }, [])

    const goToExperience = (expId) => {
        setExpId(expId)
        //console.log(expId)
        navigate(`/experience`)
    }

    // Review
    const handleReviewModal = (event, expId) => {
        event.stopPropagation();
        const { clientY } = event;

        const modalY = clientY - 150;

        // Set the modal style
        setModalStyle({
            top: `${modalY}px`,
            position: 'fixed',
            left: '50%',
            transform: 'translateX(-50%)',
        });
    
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
                {experiences.slice(-8).map((allexp, index) => (
                    <Grid item key={index} xs={6}>
                    <Card onClick={() => {goToExperience(allexp._id)}}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <img src={allexp.images} style={{borderRadius: "50px", maxWidth: "100%"}}/>
                            </Grid>
                            <Grid item xs={12}>
                                <strong>{allexp.title}</strong>
                            </Grid>
                            <Grid item xs={12}>
                                <strong>Location: </strong>{allexp.location.coordinates[0]}, {allexp.location.coordinates[1]}
                            </Grid>
                            {/* <Grid item xs={12}>
                                <strong>Posted By: </strong>{allexp.owner}
                            </Grid> */}
                            <Grid item xs={12}>
                                <strong>Rating: </strong>{allexp.averageRating}
                            </Grid>
                            <Grid item xs={12}>
                                {allexp.description}
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={(event)=>{handleReviewModal(event, allexp._id)}} className="button delete-button">
                                    Review
                                </Button>
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
                style={modalStyle}
            ></ReviewModal>}
        </Container>
    )
}

export default ExperienceList;

