const { Trip } = require('../models/schema')


// Trip CRUD Functions

// Retrieve All The User's Trips
const getAllUserTrips = async (userid) => {
    const trips = await Trip.find({owner: userid})
    return trips;
}

// Retrieve A Specific Trip
const getTripById = async (id) => {
    const trip = await Trip.findById(id)
    return trip;
}

// Create A Trip
const createTrip = async (data) => {
    const trip = new Trip({ title: data.title, description: data.description, 
    image: data.image, owner: data.owner, experiences: data.experiences })
    return trip.save();
}

// Update A Trip
const updateTrip = async (id, data) => {
    const trip = await Trip.findByIdAndUpdate(id, data)
    return trip;
}

// Delete A Trip
const deleteTrip = async (id) => {
    try { const trip = await Trip.findByIdAndDelete(id) }
    catch (error) { console.error(`Error deleting trip ${id}`, error) }
}

module.exports = { getAllUserTrips, getTripById, createTrip, updateTrip, deleteTrip }