import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Paper, Grid, Box, Card, Divider, Chip, Button, FormControl, FormLabel, InputLabel, TextField, Select, option } from '@mui/material'

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [newReview, setNewReview] = useState({ experienceId: '', rating: 5, description: "" });
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem("id");
        if (!userId) {
            navigate("/login");
        } else {
            fetch(`http://localhost:5000/my-experiences/${userId}`)
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

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                rating: newReview.rating,
                description: newReview.description,
                owner: localStorage.getItem("id"),
                experience: newReview.experienceId
            }),
        })
            .then(response => response.json())
            .then(data => {
                setReviews([...reviews, data]);
                setNewReview({ ...newReview, description: '' });
            })
            .catch(error => console.error('Error posting review:', error));
    };

    const adjustTextareaHeight = (e) => {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;
        setNewReview({ ...newReview, description: e.target.value });
    };


    return (
        <Container>
            <h2>My Reviews</h2>
            <form onSubmit={handleSubmit}>
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
                    <select label="Rating"
                        value={newReview.rating}
                        onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                    >
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                    </select>
                    <TextField label="Review"
                        className="review-textarea"
                        value={newReview.description}
                        onChange={adjustTextareaHeight}
                        required
                    />
                    <Button type="submit" className="button submit-button">Add Review</Button>
                </FormControl>
            </form>
            <br />
            <Divider />
            <br />
            <Grid container spacing={3}>
                {reviews.length > 0 ? (
                    reviews.map(review => {
                        // Find the experience that matches the review's experienceId
                        const matchingExperience = experiences.find(exp => exp._id === review.experience);
                        const experienceTitle = matchingExperience ? matchingExperience.title : "Unknown Experience";
                        return (
                            <Grid item xs={4}>
                                <Card key={review._id}>
                                    <p>Experience: {experienceTitle}</p>
                                    <p>Rating: {review.rating}</p>
                                    <p>Description: {review.description}</p>
                                    <Button onClick={() => handleDelete(review._id)} className="button delete-button">
                                        Delete
                                    </Button>
                                </Card>
                            </Grid>
                        )
                    })
                ) : (
                    <p>No reviews found.</p>
                )}
            </Grid>

        </Container>
    )
}

export default Reviews;
