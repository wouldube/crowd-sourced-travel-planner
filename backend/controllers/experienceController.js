const { Experience } = require('../models/schema')


// experience CRUD functions

//Retrieve

// Retrieve all experiences
const getAllExperiences = async () => {
    console.log("Fetching all experiences");
    const experiences = await Experience.find();
    return experiences;
}

// Retrieve a specific experience by ID
const getExperienceById = async (id) => {
    console.log(`Fetching experience with ID: ${id}`);
    const experience = await Experience.findById(id);
    return experience;
}

//Create
const createExperience = async (title, description, location, images) => {
    // left out reviews for now
    const experience = new Experience({ title: title, description: description, 
        location: location, images: images });
    return experience.save()
}


//Update
const updateExperience = async(id, update) => {

    // update: {"property to update": updated value}
    // returns 0 if update fails, 1 if update succeeds

    const result = await Experience.updateOne({"_id": id}, update);
    return result.modifiedCount;
}

//Delete
const deleteExperience = async(id) => {

    // returns 0 if delete fails, 1 if delete succeeds

    const result = await Experience.deleteOne({"_id": id});
    return result.deletedCount;

}

module.exports = { getAllExperiences, getExperienceById, createExperience, updateExperience, deleteExperience }