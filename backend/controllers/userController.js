const { User, Trip } = require('../models/schema')
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
        //console.log(expList);
    }
    return expList;
}

const updateUserExperiences = async (userID, experienceID, add=1) => {
    // Working on this; should update user info as well as explist
    const user = await User.findById(userID)
    for (let i=0; i<user.experiences.length; i++) {
        if (experienceID == user.experiences[i]._id.toString()) {
            await user.experiences.splice(i,1)
            await User.updateOne({_id: userID}, {experiences: user.experiences})
            break
        }
    }
    return
}

const deleteUserExperience = async (id) => {
    // Delete an user's experience, working on this
    const expList = await getUserExperiences(id)
    const experience = await expList.findByIdAndDelete(id)
    await updateUserExperience(user, id, 0)
    return experience.deletedCount;
};

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
        //console.log(favList);
    }
    return favList;
}

const getUserTrips = async (id) => {
    // id: document id
    // returns a list of trip ids
    const user = await User.findById(id);
    let trips = []

    for (let i=0; i<user.trips.length; i++) {
        trips.push(await Trip.findById(user.trips[i]));
    }

    return trips
}

const updateUserTrips = async (userID, tripID, add=1) => {
    // updates user trips to append a new one
    // Adds in default; Removes otherwise
    const user = await User.findById(userID)
    if (add) {
        await User.updateOne({_id: userID}, {$push: {trips: tripID}})
    } else {
        for (let i=0; i<user.trips.length; i++) {
            if (tripID == user.trips[i]._id.toString()) {
                await user.trips.splice(i,1)
                await User.updateOne({_id: userID}, {trips: user.trips})
                break
            }
        }
    }
    return
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

module.exports = { getUserById, getUserByUid, getUserExperiences, updateUserExperiences, deleteUserExperience, 
    getUserFavorites, getUserReviews, getUserTrips, updateUserTrips, 
    createUser, updateUser, deleteUser };
