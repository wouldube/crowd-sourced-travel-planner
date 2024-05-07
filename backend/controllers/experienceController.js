const { Experience, Review, User, Trip } = require('../models/schema');
const { createReview } = require('./reviewController');

// experience CRUD functions

//Retrieve

// Retrieve all experiences
const getAllExperiences = async () => {
    const experiences = await Experience.find();
    return experiences;
}

// Retrieve a specific experience by ID
const getExperienceById = async (id) => {
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
    // Step 1: Delete all reviews associated with the experience
    const deleteReviews = await Review.deleteMany({ experience: id });

    // Step 2: Remove experience from users' experiences list
    await User.updateMany(
        { experiences: id },
        { $pull: { experiences: id } }
    );

    // Step 3: Remove experience from trips
    await Trip.updateMany(
        { experiences: id },
        { $pull: { experiences: id } }
    );

    // Step 4: Finally delete the experience
    const result = await Experience.deleteOne({ _id: id });
    return result.deletedCount;
}


// Search
const searchExperiences = async (textQuery, longitude, latitude, rating, sortField, sortOrder) => {

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
                $maxDistance: 20000
            }
        };
    }

    if (rating >= 0) {
        searchCriteria['averageRating'] = {
            $gte: rating
        }
    }
    let sort = {
        title: 1
    }
    if (sortField && sortOrder) {
        sort = {};
        sort[sortField] = sortOrder === 'asc'? 1:-1
    }
    return await Experience.find(searchCriteria).collation({locale:'en'}).sort(sort);
    
};


module.exports = { getAllExperiences, getExperienceById, createExperience, updateExperience, deleteExperience, searchExperiences }