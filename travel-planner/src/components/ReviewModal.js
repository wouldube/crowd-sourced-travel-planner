import React, { useState } from 'react';
import { Container, Paper, Grid, Box, Card, Divider, Chip, Button, FormControl, FormLabel, InputLabel, TextField } from '@mui/material'

const ReviewModal = ({ onClose, expId, style }) => {
    const [rating, setRating] = useState(5);
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
        <Grid style={{
            ...style,
            padding: '20px',
            maxWidth: '600px',
            background: 'radial-gradient(#FFFFFF, #f6e1a1)',
            borderRadius: '8px',
        }} maxWidth="sm">
            <Box display="flex" justifyContent="flex-end">
                <Button onClick={onClose}>X</Button>
            </Box>
            <FormLabel>Review Experience</FormLabel>
            <form onSubmit={handleSubmit}>
            <FormControl>
                    <InputLabel htmlFor="rating">Rating:</InputLabel>
                    <select
                        id="rating" value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    >
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                    </select>

                <TextField
                    id="description" label="Description"
                    multiline rows={2}
                    value={description} onChange={(e) => setDescription(e.target.value)}
                    margin="normal"
                />
                <Button type="submit">Submit Review</Button>
                </FormControl>
            </form>
        </Grid>
    );
};


export default ReviewModal;