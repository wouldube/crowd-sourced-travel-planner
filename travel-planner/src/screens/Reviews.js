import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
        <div className="reviews-container">
            <h2>Your Reviews</h2>
            <form onSubmit={handleSubmit} className="review-form">
                <label>
                    Experience:
                    <select 
                    className="review-select"
                        value={newReview.experienceId} 
                        onChange={(e) => setNewReview({ ...newReview, experienceId: e.target.value })}
                        required
                    >
                        {experiences.map((exp) => (
                            <option key={exp._id} value={exp._id}>{exp.title}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Rating:
                    <select 
                        className="review-select"
                        value={newReview.rating} 
                        onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                    >
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                    </select>
                </label>
                <label>
                    Description:
                    <textarea 
                        className="review-textarea"
                        value={newReview.description} 
                        onChange={adjustTextareaHeight}
                        required
                    />
                </label>
                <button type="submit" className="button submit-button">Add Review</button>
            </form>
            <div className="reviews-list">
            {reviews.length > 0 ? (
                reviews.map(review => {
                    // Find the experience that matches the review's experienceId
                    const matchingExperience = experiences.find(exp => exp._id === review.experience);
                    const experienceTitle = matchingExperience ? matchingExperience.title : "Unknown Experience";
                    return (
                    <div key={review._id} className="review-item">
                        <p>Experience: {experienceTitle}</p>
                        <p>Rating: {review.rating}</p>
                        <p>Description: {review.description}</p>
                        <button onClick={() => handleDelete(review._id)} className="button delete-button">
                            Delete
                        </button>
                    </div>
                );
            })
        ) : (
        <p>No reviews found.</p>
        )}
        </div>
        </div>
    );
};

export default Reviews;
