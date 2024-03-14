import React, { useState } from 'react';
import { Container, Paper, Grid, Box, Card, CardHeader, CardContent, CardMedia,
    FormControl, FormGroup, FormLabel, TextField, Select, MenuItem,
    Button, ButtonGroup, IconButton, Tooltip, Rating, Divider } from '@mui/material';

const ReviewModal = ({ onClose, expId, style }) => {
    const [rating, setRating] = useState(3);
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const reviewData = {
            rating,
            description,
            owner: localStorage.getItem("id"),
            experience: expId,
        };

        fetch(`http://localhost:5000/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        })
            .then(response => response.json())
            .then(() => onClose())
            .catch(error => console.error('Error posting review:', error));
    };

    return (
        <Card style={{
            position: "fixed", zIndex: "3",
            bottom: "10%", width: "40%", height: "50%"
        }}>
                <Grid container justifyContent="center" spacing={1}>
                    <form onSubmit={handleSubmit}>
                        <FormControl>
                            <Grid item xs={12}>
                                <Button onClick={onClose}>X</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <FormLabel>Review Experience</FormLabel>
                            </Grid>
                            <Grid item xs={12}>
                                <Rating id="rating" value={rating} precision={0.1}
                                    onChange={(e) => setRating(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="description" label="Description" variant="filled"
                                    multiline rows={2}
                                    value={description} onChange={(e) => setDescription(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit">Submit Review</Button>
                            </Grid>
                        </FormControl>
                    </form>
                </Grid>
        </Card>
    );
};


export default ReviewModal;