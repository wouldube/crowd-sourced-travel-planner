const { Trip, User } = require('../models/schema')
const { getExperienceById } = require("../controllers/experienceController");
const { updateUserTrips } = require("../controllers/userController");


// Trip CRUD Functions

// Retrieve All The User's Trips
const getAllUserTrips = async (userid) => {
    const user = await User.findById(userid)
    const tripsIDs = await user['trips']

    const trips = []
    for (i=0; i<length(tripsIDs); i++) {
        trips.push(Trip.findById(tripsIDs[i]))
    }
    
    return trips
}

// Retrieve A Specific Trip
const getTripById = async (id) => {
    const trip = await Trip.findById(id)
    return trip
}

// Create A Trip
const createTrip = async (data) => {
    const trip = new Trip({
        title: data.title, description: data.description, 
        image: data.image, owner: data.owner,
        experiences: data.experiences
    })
    await updateUserTrips(trip["owner"], trip._id)
    return trip.save()
}

// Update A Trip
const updateTrip = async (id, data) => {
    const trip = await Trip.findByIdAndUpdate(id, data)
    return trip
}

// Delete A Trip
const deleteTrip = async (id, owner) => {
    const trip = await Trip.findByIdAndDelete(id)
    await updateUserTrips(owner, id, 0) // 0 = delete
    return trip.deletedCount
}

const getTripExperiences = async (id) => {
    const trip = await Trip.findById(id)

    let experiences = []
    for (i=0; i<trip.experiences.length; i++) {
        experiences.push(await getExperienceById(trip.experiences[i]))
    }

    return experiences
}
module.exports = { getAllUserTrips, getTripById, createTrip, updateTrip, deleteTrip, getTripExperiences }