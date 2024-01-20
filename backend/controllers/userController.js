const { User } = require('../models/schema')
// user CRUD functions

// Read
const getUserById = async (id) => {

    // id: document id

    const user = await User.findById(id);
    return user;
}

const getUserExperiences = async (id) => {
    
    // id: document id
    // returns a list of experience ids

    const user = await User.findById(id);
    return user.experiences

}

const getUserReviews = async (id) => {

    // id: document id
    // returns a list of review ids

    const user = await User.findById(id);
    return user.reviews

}

const getUserTrips = async (id) => {

    // id: document id
    // returns a list of trip ids

    const user = await User.findById(id);
    return user.trips

}

//Create
const createUser = async (uid, email, username, name, bio, img) => {

    // returns 0 if update fails, 1 if update succeeds
    
    const user = new User({ uid: uid, email: email, username: username, 
        name: name, bio: bio, profile_img: img });
    return user.save()
}

//Update
const updateUser = async(id, update) => {

    // update: {"property to update": updated value, "property to update": updated value}
    // returns 0 if update fails, 1 if update succeeds

    const result = await User.updateOne({"_id": id}, update);
    return result.modifiedCount;
}

//Delete
const deleteUser = async(id) => {

    // returns 0 if delete fails, 1 if delete succeeds

    const result = await User.deleteOne({"_id": id});
    return result.deletedCount;

}

module.exports = { getUserById, getUserExperiences, getUserReviews, getUserTrips, createUser, updateUser, deleteUser };