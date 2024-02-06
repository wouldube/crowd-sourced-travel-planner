const { User } = require('../models/schema')
const { getExperienceById } = require("../controllers/experienceController");
// user CRUD functions

// Read
const getUserById = async (id) => {

    // id: document id

    const user = await User.findById({"_id": id});
    return user;
}

const getUserByUid = async (id) => {

    // id: document id

    const user = await User.findOne({"uid": id});
    return user;
}

const getUserExperiences = async (id) => {
    
    // id: document id
    // returns a list of experience ids
    
    const user = await User.findById(id);
    let expList = [];
    for (let i = 0; i < user.experiences.length; i++) {
        expList.push(await getExperienceById(user.experiences[i]));
        console.log(expList);
    }
    return expList;

}

const getUserReviews = async (id) => {

    // id: document id
    // returns a list of review ids

    const user = await User.findById(id);
    return user.reviews

}

const getUserFavorites = async (id) => {
    // id: document id
    // returns a list of favorite experience ids
    const user = await User.findById(id);
    let favList = [];
    for (let i = 0; i < user.favorites.length; i++) {
        favList.push(await getExperienceById(user.favorites[i])); //check this
        console.log(favList);
    }
    return favList;

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

    const result = await User.updateOne({"uid": id}, update);
    return result.modifiedCount;
}

//Delete
const deleteUser = async(id) => {

    // returns 0 if delete fails, 1 if delete succeeds

    const result = await User.deleteOne({"_id": id});
    return result.deletedCount;

}

module.exports = { getUserById, getUserByUid, getUserExperiences, getUserFavorites, getUserReviews, getUserTrips, createUser, updateUser, deleteUser };
