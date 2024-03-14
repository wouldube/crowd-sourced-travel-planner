const { Experience, User } = require('../models/schema');
const { createReview } = require('./reviewController');

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
const createExperience = async (title, description, location, images, id, initialReview) => {

    const owner = await User.findById({"_id": id});
    const experience = new Experience({ title, description, 
        location, images, owner });
    
    const result = await experience.save();
    let user_exp = owner.experiences;
    user_exp.push(result._id)

    await User.updateOne({"_id": id}, {"experiences": user_exp})

    // Checking if review was submitted
    if (initialReview){
        await createReview(initialReview.rating, initialReview.description, id, result._id);
    }
    
    return result
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
const deleteExperience = async(id) => {

    // returns 0 if delete fails, 1 if delete succeeds
    
    const result = await Experience.deleteOne({"_id": id});
    return result.deletedCount;

}

// Search
const searchExperiences = async (textQuery, longitude, latitude, maxDistance) => {
    let searchCriteria = {
        $or: [
            { title: { $regex: textQuery, $options: 'i' } },
            { description: { $regex: textQuery, $options: 'i' } },
        ]
    };

    if (longitude && latitude) {

        searchCriteria['location'] = {
            $near: {
                $geometry: { type: "Point", coordinates: [longitude, latitude] },
                $maxDistance: maxDistance
            }
        };
    }

    return await Experience.find(searchCriteria);
};


module.exports = { getAllExperiences, getExperienceById, createExperience, updateExperience, deleteExperience, searchExperiences }