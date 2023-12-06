const { Experience } = require('../models/schema')


// experience CRUD functions

//Retrieve
// Experiences
const experiences = async(res) => {
    try {
        const experiences = await Experience.find();
        return res.json(experiences);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

// Specific Experience
const retrieveExperience = async(req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) {
            return res.status(404).json({ message: "Experience not found" });
        }
        return res.json(experience);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

//Create
const createExperience = async (title, description, location, images) => {
    // left out reviews for now
    const experience = new Experience({ title: title, description: description, 
        location: location, images: images });
    return experience.save()
}


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