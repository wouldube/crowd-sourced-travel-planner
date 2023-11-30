const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema =  mongoose.Schema({
    uid: String, // Firebase UID
    email: { type: String, required: true },
    username: { type: String, required: true },
    name: { type: String },
    bio: { type: String },
    profile_img: { type: String },
    experiences: [{ type: mongoose.Types.ObjectId, required: false }], // list of Experience ids
    trips: [{ type: mongoose.Types.ObjectId, required: false }], // list of Trip ids
    reviews: [{ type: mongoose.Types.ObjectId, required: false }], // list of Review ids
    favorites: [{ type: mongoose.Types.ObjectId, required: false }], // list of Experience ids
});


const experienceSchema = mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String, required: true },

    location: { // GeoJson type for geolocation data
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },

    images: [{ type: String, required: true }],
    owner: { type: mongoose.Types.ObjectId, required: true }, // User id
    reviews: [{ type: mongoose.Types.ObjectId, required: false }], // list of Review ids
});


const tripSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    image: { type: String, required: false },
    owner: { type: mongoose.Types.ObjectId, required: true }, // User id
    experiences: [{ type: mongoose.Types.ObjectId, required: false }], // list of Experience ids
});


const reviewSchema = mongoose.Schema({
    rating: { type: Number, required: true },
    description: { type: String, required: false },
    owner: { type: mongoose.Types.ObjectId, required: true }, // User id
    experience: { type: mongoose.Types.ObjectId, required: true }, // Experience id
});


const User = mongoose.model('User', userSchema);
const Experience = mongoose.model('Experience', experienceSchema);
const Trip = mongoose.model('Trip', tripSchema);
const Review = mongoose.model('Review', reviewSchema);

module.exports = { User, Experience, Trip, Review }