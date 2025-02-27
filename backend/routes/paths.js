const mongoose = require("mongoose");
const express = require('express');
const cors = require("cors");

const { getAllExperiences, getExperienceById, createExperience, updateExperience, deleteExperience, searchExperiences } = require('../controllers/experienceController');
const { createReview, getReviewsByExperienceId, getReviewById, getReviewsByUserId, updateReview, deleteReview } = require('../controllers/reviewController');
const tripController = require("../controllers/tripController");
const { getUserById, getUserByUid, getUserExperiences, getUserFavorites, getUserReviews, getUserTrips, createUser, updateUser, deleteUser, getUsers } = require('../controllers/userController');


const corsOptions = {
  origin: "http://localhost:3000", 
};

const router = express.Router();
router.use(cors(corsOptions));
router.use(express.json());

// Basic test route
router.get('/', (req, res) => {
    res.json('hello world');
});

 
// ---- User CRUD Operations ----

router.get('/user-info/:id', async (req, res) => {
    // Get User
    try {
        const user = await getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
        
    } catch(error) {
        console.error(`Error in GET /user-info/${req.params.id}:`, error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/user/:uid', async (req, res) => {
    // Get User
    try {
        const user = await getUserByUid(req.params.uid);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
        
    } catch(error) {
        console.error(`Error in GET /user-info/${req.params.id}:`, error);
        res.status(500).json({ message: error.message });
    }
});

router.post('/new-user', async (req, res) => {
    // Create User (will be moved into register route when firebase is set up)
    try {
        const { uid, email, username, name, bio } = req.body;
        // console.log(req.body)
        const numCreated = await createUser(uid, email, username, name, bio);
        res.status(201).json(numCreated); // if numCreated = 0 -> create unsuccessful
    } catch (error) {
        console.error("Error in POST /new-user:", error);
        res.status(500).json({ message: error.message });
    }

});

router.put('/user-info/:id', async (req, res) => {
    // Update User
    // console.log("updating")
    // console.log(req.body)
    try {
        const userUpdate = req.body;
        const numUpdated = await updateUser(req.params.id, userUpdate);
        res.json(numUpdated); // if numUpdated = 0 -> update unsuccessful
    } catch (error) {
        console.error(`Error in PUT /user-info/${req.params.id}:`, error);
        res.status(500).json({ message: error.message });
    }

});

router.delete('/user-info/:id', async (req, res) => {
    // Delete User
    try {
        const numDeleted = await deleteUser(req.params.id);
        // TODO: delete User's Experiences, Ratings, Trips? or assign to a default User?
        res.json(numDeleted); // if numDeleted = 0 -> delete unsuccessful

    } catch (error) {
        console.error(`Error in DELETE /user-info/${req.params.id}:`, error);
        res.status(500).json({ message: error.message });
    }

});

// ---- Experience CRUD Operations ----
// Route to get all experiences
router.get('/experiences', async (req, res) => {
    try {
        // console.log("GET request to /experiences");
        const allExperiences = await getAllExperiences();
        res.json(allExperiences);
    } catch (error) {
        console.error("Error in GET /experiences:", error);
        res.status(500).json({ message: error.message });
    }
});

// Route to get a specific experience by its ID
router.get('/experiences/:id', async (req, res) => {
    try {
        // console.log(`GET request to /experiences/${req.params.id}`);
        const experience = await getExperienceById(req.params.id);
        if (!experience) {
            return res.status(404).json({ message: "Experience not found" });
        }
        res.json(experience);
    } catch (error) {
        console.error(`Error in GET /experiences/${req.params.id}:`, error);
        res.status(500).json({ message: error.message });
    }
});

router.post("/create-exp", async (req, res) => {
    // Create a new experience

    let { title, description, coordinates, image, id, initialReview } = req.body;
    
    coordinates = [Number(coordinates['latitude']), Number(coordinates['longitude'])];

    // DEBUG
    // console.log('Title:', title);
    // console.log('Description:', description);
    // console.log('Coordinates:', coordinates);
    // console.log('Image:', image);
        
    if (!title || !description || !coordinates || !image ) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    
    //converting string to mongoose Object
    const location = { type: "Point", coordinates: coordinates };
    const result = await createExperience(
      title,
      description,
      location,
      image,
      id,
      initialReview
    );
    
    res
      .status(200)
      .json({ message: "Experience created successfully", result: result });
});

router.put('/update-exp/:experience_id', async (req, res) => {
    //console.log("updating")
    console.log(req.body)
    const experience_id = req.params.experience_id;
    const filter = {"_id": experience_id};
    const update = req.body;
    try {
        const modifiedCount = await updateExperience(filter, update);
        
        if (modifiedCount > 0) {
            res.json(modifiedCount);
        } else {
            res.status(404).json({ message: "Experience not found or no update needed" });
        }
    } catch (error) {
        console.error(`Error in PUT /update-exp/${experience_id}:`, error);
        res.status(500).json({ message: error.message });
    }
});

router.delete('/delete-exp/:experience_id', async (req, res) => {
    // Delete an experience
    const id = req.params.experience_id;
    let { owner } = req.body;
    try {
        const modifiedCount = await deleteExperience(id);

        // Delete from User's Experiences
        const user = await getUserById(owner)
        const expList = user.experiences

        let expIndex = expList.indexOf(id)
        if (expIndex > -1) {
            expList.splice(expIndex, 1);
        }
        const deleted = await updateUser(owner, {'experiences' : expList})

        // Delete from Trips
        const trips = await tripController.getTrips();
        for (let i = 0; i < trips.length; i++) {
            let trip = trips[i]
            let index = trip.experiences.indexOf(id)

            if (index >= 0) {
                trip.experiences.splice(index, 1);
                await tripController.updateTrip(trip._id, trip)
            }
        }

        // Delete from Favorites
        const users = await getUsers();
        for (let i = 0; i < users.length; i++) {
            let user = users[i]
            let index = user.favorites.indexOf(id)

            if (index >= 0) {
                user.favorites.splice(index, 1);
                await updateUser(user._id, user)
            }
        }

        res.json(deleted);

    } catch (error) {
        console.error(`Error in DELETE /delete-exp/${experience_id}:`, error);
        res.status(500).json({ message: error.message });
    }

});

// Route to handle search requests
router.get('/search', async (req, res) => {

    const { query, sort } = req.query;
    let coordinates = req.query.coordinates.split(',');
    let rating = parseInt(req.query.rating);

    let latitude = null;
    let longitude = null;
    // let maxDistance = null;

    // Check if the query parameters for longitude and latitude are provided before parsing
    rating = !isNaN(rating) ? rating : undefined;
    if (coordinates != "") {
        latitude = coordinates[1];
        longitude = coordinates[0];
    }
    
    let sortField = undefined;
    let sortOrder = undefined;
    if (sort) {
        const sortSplitted = sort.split('_')
        sortField = sortSplitted[0];
        sortOrder = sortSplitted[1];
    }

    try {
        const results = await searchExperiences(query, longitude, latitude, rating, sortField, sortOrder);
        res.json(results);
    } catch (error) {
        console.error("Error in GET /search:", error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

    

// ---- Trip CRUD Operations ----
router.get('/trips/:id', async (req, res) => {
    // Fetch the user's trips
    try {
        // console.log(`GET request to /trips`)
        const allUserTrips = await getUserTrips(req.params.id)
        res.json(allUserTrips)
    } catch (error) {
        console.error(`Error in GET /trips`, error)
        res.status(500).json({ message: error.message })
    }
})

router.get('/trip/:id', async (req, res) => {
    // Fetch specific trip details
    try {
        // console.log(`GET request to trip ${req.params.id}`)
        const trip =  await tripController.getTripById(req.params.id)
        if (!trip) {
            return res.status(404).json({ message: "Trip not found" })
        }
        res.json(trip)
    } catch (error) {
        console.error(`Error in GET /trip/${req.params.id}`, error)
        res.status(500).json({ message: error.message })
    }
})

router.get('/trip/experiences/:id', async (req, res) => {
    // Fetch specific trip experiences
    try {
        // console.log(`GET request to trip's experiences ${req.params.id}`)
        const experiences =  await tripController.getTripExperiences(req.params.id)
        res.json(experiences)
    } catch (error) {
        console.error(`Error in GET /trip/experiences/${req.params.id}`, error)
        res.status(500).json({ message: error.message })
    }
})

router.post('/create-trip', async (req, res) => {
    // Create a new trip
    try {
        // console.log(`POST request for trip`)
        const trip =  await tripController.createTrip(req.body)
        res.status(200).json(trip)
    } catch (error) {
        console.error(`Error in POST /create-trip/`, error)
        res.status(500).json({ message: error.message })
    }
})

router.put('/update-trip/:id', async (req, res) => {
    // Update an existing trip
    try {
        // console.log(`PUT request for trip`)
        const trip =  await tripController.updateTrip(req.params.id, req.body)
        res.json(trip)
    } catch (error) {
        console.error(`Error in PUT /update-trip/${req.params.id}`, error)
        res.status(500).json({ message: error.message })
    }
})

router.delete('/delete-trip/:id', async (req, res) => {
    // Delete a trip
    try {
        // console.log(`DELETE request for trip`)
        const trip =  await tripController.deleteTrip(req.params.id, req.body.owner)
        res.json({ message: "Trip deleted!"})
    } catch (error) {
        console.error(`Error in DELETE /delete-trip/${req.params.id}`, error)
        res.status(500).json({ message: error.message })
    }
})

// ---- Review CRUD Operations ----
// Create a new review
router.post('/reviews', async (req, res) => {
    try {
        const { rating, description, owner, experience } = req.body;
        const newReview = await createReview(rating, description, owner, experience);
        // TODO: add review to User's list of ratings
        // TODO: add review to Experience's list of ratings
        res.status(201).json(newReview);
    } catch (error) {
        console.error("Error in POST /reviews:", error);
        res.status(500).json({ message: error.message });
    }
});

// Get all reviews for a specific experience
router.get('/experiences/:id/reviews', async (req, res) => {
    try {
        const reviews = await getReviewsByExperienceId(req.params.id);
        res.json(reviews);
    } catch (error) {
        console.error(`Error in GET /experiences/${req.params.id}/reviews:`, error);
        res.status(500).json({ message: error.message });
    }
});

// Get a specific review by ID
router.get('/reviews/:id', async (req, res) => {
    try {
        const review = await getReviewById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.json(review);
    } catch (error) {
        console.error(`Error in GET /reviews/${req.params.id}:`, error);
        res.status(500).json({ message: error.message });
    }
});

// Get all reviews created by a specific user
router.get('/user/:userId/reviews', async (req, res) => {
    try {
        const reviews = await getReviewsByUserId(req.params.userId);
        res.json(reviews);
    } catch (error) {
        console.error(`Error in GET /user/${req.params.userId}/reviews:`, error);
        res.status(500).json({ message: error.message });
    }
});


// Update a specific review
router.put('/reviews/:id', async (req, res) => {
    try {
        const { rating, description } = req.body;
        const reviewUpdate = { rating, description };
        const updatedReview = await updateReview(req.params.id, reviewUpdate);
        res.json(updatedReview);
    } catch (error) {
        console.error(`Error in PUT /reviews/${req.params.id}:`, error);
        res.status(500).json({ message: error.message });
    }
});

// Delete a specific review
router.delete('/reviews/:id', async (req, res) => {
    try {
        const result = await deleteReview(req.params.id);
        if (result) {
            res.json({ message: "Review deleted successfully" });
        } else {
            res.status(404).json({ message: "Review not found" });
        }
    } catch (error) {
        console.error(`Error in DELETE /reviews/${req.params.id}:`, error);
        res.status(500).json({ message: error.message });
    }
});


// ---- User Specific Pages ----

// User Profile Page
router.get('/profile/:username', (req, res) => {
    // Fetch and display user profile based on username
});

router.post('/profile/:username', (req, res) => {
    // Update user profile information
});

router.get('/my-experiences/:id', async (req, res) => {
    // Fetch and display experiences created by the user
    // console.log(req.params.id)
    try {
        const experiences = await getUserExperiences(req.params.id);
        // console.log(experiences)
        res.json(experiences);
    } catch (error) {
        console.error(`Error in retrieving user experiences`, error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/my-favorites/:id', async (req, res) => {
    // Fetch and display experiences favorited by the user
    // console.log(req.params.id)
    try {
        const favorites = await getUserFavorites(req.params.id);
        // console.log(favorites)
        res.json(favorites);
    } catch (error) {
        console.error(`Error in retrieving user favorites`, error);
        res.status(500).json({ message: error.message });
    }
});


// My Trips Page
router.get('/my-trips', (req, res) => {
    // Fetch and display trips created by the user
});

// My Reviews Page
router.get('/my-reviews/:userId', async (req, res) => {
    // Fetch and display reviews created by the user
    try {
        const userId = req.params.userId;
        const reviews = await getReviewsByUserId(userId);
        res.json(reviews.map(review => ({
            ...review._doc, // Spread the review document
            experience: review.experience // Include the full experience details
        })));
    } catch (error) {
        console.error(`Error in GET /my-reviews/${req.params.userId}:`, error);
        res.status(500).json({ message: error.message });
    }
});




// ---- Community Engagement and Content Enrichment Endpoints ----

// Community Contribution Endpoint
router.post('/api/contribute', (req, res) => {
    res.json({ message: "Community contribution endpoint placeholder" });
});

// Local Spotlight Endpoint
router.get('/api/local/spotlight', (req, res) => {
    res.json({ message: "Local spotlight endpoint placeholder" });
});

// Badge Reward System Endpoint
router.post('/api/rewards/badges', (req, res) => {
    res.json({ message: "Badge reward system endpoint placeholder" });
});

// User Feedback and Interaction Endpoint
router.post('/api/feedback', (req, res) => {
    res.json({ message: "User feedback endpoint placeholder" });
});

// User Engagement Analytics Endpoint
router.get('/api/engagement/metrics', (req, res) => {
    res.json({ message: "User engagement analytics endpoint placeholder" });
});

// Experience Rating and Review Endpoint
router.post('/api/experiences/rate', (req, res) => {
    res.json({ message: "Experience rating and review endpoint placeholder" });
});

// ---- Geo-Location Services Endpoints ----
router.get('/api/experiences/nearby', (req, res) => {
    res.json({ message: "Geo-location services - nearby experiences endpoint placeholder" });
});

router.post('/api/experiences', (req, res) => {
    res.json({ message: "Create experience endpoint placeholder" });
});

router.put('/api/experiences/:id/location', (req, res) => {
    res.json({ message: "Update experience location endpoint placeholder" });
});

router.delete('/api/experiences/:id', (req, res) => {
    res.json({ message: "Delete experience endpoint placeholder" });
});

// ---- Mapping Endpoints ----
router.get('/api/maps/routes/:userid', (req, res) => {
    res.json({ message: "Mapping routes endpoint placeholder" });
});

router.get('/api/maps/areas/:userid', (req, res) => {
    res.json({ message: "Mapping areas endpoint placeholder" });
});

router.post('/api/maps/annotations', (req, res) => {
    res.json({ message: "Mapping annotations endpoint placeholder" });
});

module.exports = router;