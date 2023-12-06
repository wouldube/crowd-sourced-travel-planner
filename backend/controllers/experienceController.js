const { Experience } = require('../models/schema')

// experience CRUD functions

//Create
const createExperience = async (title, description, location, images) => {
    // left out reviews for now
    const experience = new Experience({ title: title, description: description, 
        location: location, images: images });
    return experience.save()
}


//Read


//Update
const updateExperience = async(filter, update) => {

    // filter: {"_id": document_id}
    // update: {"property to update": updated value}
    // returns 0 if update fails, 1 if update succeeds

    const result = await Experience.updateOne(filter, update);
    return result.modifiedCount;
}

//Delete
const deleteExperience = async(filter) => {

    // filter: {"_id": document_id}
    // returns 0 if delete fails, 1 if delete succeeds

    const result = await Experience.deleteOne(filter);
    return result.deletedCount;

}

module.exports = { createExperience, updateExperience, deleteExperience }