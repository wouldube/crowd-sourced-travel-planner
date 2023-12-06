const mongoose = require("mongoose");
const express = require('express');
const cors = require("cors");

const { createExperience } = require("../controllers/experienceController");

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

// Route to get all experiences
router.get('/experiences', async (req, res) => {
    try {
        const experiences = await Experience.find();
        res.json(experiences);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/login', (req, res) => {
    // Handle login logic here
});

router.post('/register', (req, res) => {
    // Handle registration logic here
});

router.get('/user-info', (req, res) => {
    // Handle fetching user info here
});

router.post('/user-info', (req, res) => {
    // Handle updating user info here
});

// ---- Experience CRUD Operations ----
router.get('/exp/:experience_id', (req, res) => {
    // Fetch specific experience details
});

router.post("/create-exp", async (req, res) => {
    // Create a new experience
    console.log("backend")
    
    let { title, description, coordinates, image } = req.body;
    
    coordinates = [Number(coordinates['latitude']), Number(coordinates['longitude'])];

    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Coordinates:', coordinates);
    console.log('Image:', image);
    //Checking missing fields
        
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
    );
    
    console.log(result)

    res
      .status(200)
      .json({ message: "Experience created successfully", result: result });
});

router.put('/update-exp/:experience_id', (req, res) => {
    // Update an existing experience
});

router.delete('/delete-exp/:experience_id', (req, res) => {
    // Delete an experience
});

// ---- Trip CRUD Operations ----
router.get('/trip/:trip_id', (req, res) => {
    // Fetch specific trip details
});

router.post('/create-trip', (req, res) => {
    // Create a new trip
});

router.put('/update-trip/:trip_id', (req, res) => {
    // Update an existing trip
});

router.delete('/delete-trip/:trip_id', (req, res) => {
    // Delete a trip
});

// ---- Review CRUD Operations ----
router.post('/create-review', (req, res) => {
    // Create a new review
});

router.delete('/delete-review/:review_id', (req, res) => {
    // Delete a review
});

// ---- User Specific Pages ----

// User Profile Page
router.get('/profile/:username', (req, res) => {
    // Fetch and display user profile based on username
});

router.post('/profile/:username', (req, res) => {
    // Update user profile information
});

// My Experiences Page
router.get('/my-experiences', (req, res) => {
    // Fetch and display experiences created by the user
});

// My Trips Page
router.get('/my-trips', (req, res) => {
    // Fetch and display trips created by the user
});

// My Reviews Page
router.get('/my-reviews', (req, res) => {
    // Fetch and display reviews created by the user
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

// Route to get a specific experience by its ID
router.get('/experiences/:id', async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) {
            return res.status(404).json({ message: "Experience not found" });
        }
        res.json(experience);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
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