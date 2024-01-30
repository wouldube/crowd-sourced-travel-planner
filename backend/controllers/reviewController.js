const { Review } = require('../models/schema');

// Review CRUD functions

// Create a new review
const createReview = async (rating, description, owner, experience) => {
    const review = new Review({
        rating,
        description,
        owner,
        experience
    });
    return review.save();
};

// Retrieve all reviews for a specific experience
const getReviewsByExperienceId = async (experienceId) => {
    const reviews = await Review.find({ experience: experienceId });
    return reviews;
};

// Retrieve a specific review by ID
const getReviewById = async (id) => {
    const review = await Review.findById(id);
    return review;
};

// Retrieve all reviews created by a specific user
const getReviewsByUserId = async (userId) => {
    const reviews = await Review.find({ owner: userId });
    return reviews;
};


// Update a review
const updateReview = async (id, update) => {
    const result = await Review.findByIdAndUpdate(id, update, { new: true });
    return result;
};

// Delete a review
const deleteReview = async (id) => {
    const result = await Review.findByIdAndDelete(id);
    return result;
};

module.exports = { createReview, getReviewsByExperienceId,  getReviewById, updateReview, deleteReview };
