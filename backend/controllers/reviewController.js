const { Review, Experience } = require('../models/schema');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Review CRUD functions

// Create a new review
const createReview = async (rating, description, owner, experience) => {
    const review = new Review({
        rating,
        description,
        owner,
        experience
    });
    await review.save();

    const averageReviews = await Review.aggregate([
        {$project: {experience: 1, rating: 1}},
        {$match: {experience: new ObjectId(experience)}},
        {$group: {_id: null, average: {$avg: "$rating"}}},
    ]).exec();

    await Experience.updateOne(
        {_id: new ObjectId(experience)},
        {$set: {averageRating: Number.parseFloat(averageReviews[0].average).toFixed(2)}},
        );
        
    return review;
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
    try {
        const reviews = await Review.find({ owner: userId }).populate('experience');
        return reviews;
    } catch (error) {
        throw error;
    }
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

module.exports = { createReview, getReviewsByExperienceId, getReviewById, getReviewsByUserId, updateReview, deleteReview };
