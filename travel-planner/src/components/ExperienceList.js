import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Grid, Box, Card, Button, Tooltip, Rating } from '@mui/material';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ReviewModal from './ReviewModal.js';

const ExperienceList = ({ setExpId }) => {
    const [experiences, setAllExperiences] = useState([]);

    const [visibleReviewModal, setVisibleReviewModal] = useState(false);
    const [reviewExpId, setReviewExpId] = useState();
    const [reviewExpTitle, setReviewExpTitle] = useState('');
    const [modalStyle, setModalStyle] = useState({});
    const [usernames, setUsernames] = useState([]);

    const navigate = useNavigate()

    let usernamesArr = []
    const getExperiences = async () => {
        try {
            const data = await fetch("http://localhost:5000/experiences")
            let experiences = await data.json()
            experiences = experiences.slice(-8)
            const usernames = await Promise.all(
            experiences.map(exp => getUsername(exp.owner))
        );
            setUsernames(usernames);
            setAllExperiences(experiences);
        } catch (error) { console.error('Error fetching data:', error) }
    }

    useEffect(() => {
        getExperiences();
    }, [])

    const getUsername = async (owner) => {
        try {
            const response = await fetch(`http://localhost:5000/user-info/${owner}`);
            const userInfo = await response.json();
            return userInfo.username || 'Unknown User';
        } catch (error) {
            console.error('Error fetching username:', error);
            return 'Unknown User';  // Default
        }    
    }

    const goToExperience = (expId) => {
        setExpId(expId)
        navigate(`/experience`)
    }

    // Review
    const handleReviewModal = (event, expId, title) => {
        event.stopPropagation();
        const { clientY } = event;
        const modalY = clientY - 150;

        // Set the modal style
        setModalStyle({
            position: 'fixed',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '30%',
            maxHeight: '60%',
            overflowY: 'auto',
            zIndex: 1000,
        });

        setReviewExpId(expId)
        setReviewExpTitle(title)
        setVisibleReviewModal(true)
    }

    const handleCloseReviewModal = (event) => {
        setVisibleReviewModal(false)
    }

    return (
        <Container>
            <strong>More Experiences to Explore...</strong>
            {!!visibleReviewModal &&
                    <ReviewModal
                        expId={reviewExpId}
                        title={reviewExpTitle}
                        onClose={handleCloseReviewModal}
                        style={modalStyle}
                    ></ReviewModal>}
            <Grid container spacing={3}>
                {experiences.slice(-8).map((allexp, index) => (
                    <Grid item key={index} xs={6}>
                        <Card onClick={() => { goToExperience(allexp._id) }}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <strong>{allexp.title}</strong>
                                </Grid>
                                <Grid item xs={12}>
                                    <img src={allexp.images} style={{ borderRadius: "50px", maxWidth: "100%" }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <strong>Location</strong><br />
                                    {allexp.location.coordinates[1]}, {allexp.location.coordinates[0]}
                                </Grid>
                                <Grid item xs={12}>
                                     <strong>Posted By </strong>{usernames[index] || 'Loading...'}
                                </Grid>
                                <Grid item xs={12}>
                                    <Rating
                                        value={allexp.averageRating}
                                        precision={0.1}
                                        readOnly
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    {allexp.description}
                                </Grid>
                                <Grid item xs={12}>
                                    <Tooltip title="Write a review!" followCursor>
                                        <Button onClick={(event) => handleReviewModal(event, allexp._id, allexp.title)}>
                                            <RateReviewIcon/>
                                        </Button>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default ExperienceList;