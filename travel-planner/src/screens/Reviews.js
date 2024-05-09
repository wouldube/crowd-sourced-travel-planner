import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container, Paper, Grid, Box, Card, CardHeader, CardContent, CardMedia,
    FormControl, FormGroup, FormLabel, TextField, Select, MenuItem,
    Button, ButtonGroup, IconButton, Tooltip, Rating, Divider
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Reviews = ({ setExpId }) => {
    const [reviews, setReviews] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [newReview, setNewReview] = useState({ experienceId: '', rating: 5, description: "" });
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem("id");
        if (!userId) {
            navigate("/login");
        } else {
            fetch(`http://localhost:5000/experiences`)
                .then(response => response.json())
                .then(data => {
                    setExperiences(data);
                    if (data.length > 0) {
                        setNewReview({ ...newReview, experienceId: data[0]._id });
                    }
                })
                .catch(error => console.error('Error fetching experiences:', error));

            fetch(`http://localhost:5000/user/${userId}/reviews`)
                .then(response => response.json())
                .then(data => {
                    setReviews(data);
                })
                .catch(error => console.error('Error fetching reviews:', error));
        }
    }, [navigate]);

    const handleDelete = (reviewId) => {
        fetch(`http://localhost:5000/reviews/${reviewId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Could not delete the review.');
                }
                return response.json();
            })
            .then(() => {
                setReviews(reviews.filter(review => review._id !== reviewId));
            })
            .catch(error => console.error('Error:', error));
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     fetch(`http://localhost:5000/reviews`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             rating: newReview.rating,
    //             description: newReview.description,
    //             owner: localStorage.getItem("id"),
    //             experience: newReview.experienceId
    //         }),
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             setReviews([...reviews, data]);
    //             setNewReview({ ...newReview, description: '' });
    //         })
    //         .catch(error => console.error('Error posting review:', error));
    // };

    // const adjustTextareaHeight = (e) => {
    //     e.target.style.height = 'inherit';
    //     e.target.style.height = `${e.target.scrollHeight}px`;
    //     setNewReview({ ...newReview, description: e.target.value });
    // };

    const goToExperience = (expId) => {
        setExpId(expId)
        navigate(`/experience`)
    }


    return (
        <Container style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
            <Paper>
                <h2>My Reviews</h2>
                {/* <form onSubmit={handleSubmit}>
                    <FormControl>
                        <select label="Experience"
                            value={newReview.experienceId}
                            onChange={(e) => setNewReview({ ...newReview, experienceId: e.target.value })}
                            required
                        >
                            {experiences.map((exp) => (
                                <option key={exp._id} value={exp._id}>{exp.title}</option>
                            ))}
                        </select>
                        <Rating id="rating" label="Rating" value={newReview.rating} precision={0.1}
                            onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                        />
                        <TextField label="Review"
                            className="review-textarea"
                            value={newReview.description}
                            onChange={adjustTextareaHeight}
                            required
                        />
                        <Button type="submit">Add Review</Button>
                    </FormControl>
                </form> */}
                <Grid container spacing={3}>
                    {reviews.length > 0 ? (
                        reviews.map(review => {
                            // Find the experience that matches the review's experienceId
                            const matchingExperience = experiences.find(exp => exp._id === review.experience);
                            const experienceTitle = matchingExperience ? matchingExperience.title : "Unknown Experience";
                            return (
                                <Grid item xs={4}>
                                    <Card onClick={() => {
                                        if (matchingExperience) {
                                            goToExperience(matchingExperience._id)
                                        }
                                    }}>
                                        <p>{experienceTitle}</p>
                                        <Rating id="rating" value={review.rating} precision={0.1}
                                            readOnly />
                                        <p><b>{review.description}</b></p>
                                        <Tooltip title="Delete Review" followCursor>
                                            <DeleteForeverIcon onClick={() => handleDelete(review._id)} Button />
                                            {/* <Button onClick={() => handleDelete(review._id)} className="button delete-button">
                                            Delete
                                        </Button> */}
                                        </Tooltip>
                                    </Card>
                                </Grid>
                            )
                        })
                    ) : (
                        <p>No reviews found.</p>
                    )}
                </Grid>
            </Paper>
        </Container>
    )
}

export default Reviews;
