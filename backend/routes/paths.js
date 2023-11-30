const express = require("express");
const mongoose = require("mongoose");

const {
  createExperience,
  updateExperience,
} = require("../controllers/experienceController");

// Import models - uncomment when needed
// import { User, Experience, Trip, Review } from '../models/schema';

// Import controller functions - uncomment when they are created
// const { controllerFunctionNames } = require('../controllers/controllerFileName');

const router = express.Router();
router.use(express.json());

// Basic test route
router.get("/", (req, res) => {
  res.json("hello world");
});

// ---- User CRUD Operations ----

router.post("/login", (req, res) => {
  // Handle login logic here
});

router.post("/register", (req, res) => {
  // Handle registration logic here
});

router.get("/user-info", (req, res) => {
  // Handle fetching user info here
});

router.post("/user-info", (req, res) => {
  // Handle updating user info here
});

// ---- Experience CRUD Operations ----
router.get("/exp/:experience_id", (req, res) => {
  // Fetch specific experience details
});

router.post("/create-exp", (req, res) => {
  // Create a new experience
});

router.put("/update-exp/:experience_id", (req, res) => {
  // Update an existing experience
});

router.delete("/delete-exp/:experience_id", (req, res) => {
  // Delete an experience
});

// ---- Trip CRUD Operations ----
router.get("/trip/:trip_id", (req, res) => {
  // Fetch specific trip details
});

router.post("/create-trip", (req, res) => {
  // Create a new trip
});

router.put("/update-trip/:trip_id", (req, res) => {
  // Update an existing trip
});

router.delete("/delete-trip/:trip_id", (req, res) => {
  // Delete a trip
});

// ---- Review CRUD Operations ----
router.post("/create-review", (req, res) => {
  // Create a new review
});

router.delete("/delete-review/:review_id", (req, res) => {
  // Delete a review
});

// ---- User Specific Pages ----

// User Profile Page
router.get("/profile/:username", (req, res) => {
  // Fetch and display user profile based on username
});

router.post("/profile/:username", (req, res) => {
  // Update user profile information
});

// My Experiences Page
router.get("/my-experiences", (req, res) => {
  // Fetch and display experiences created by the user
});

// My Trips Page
router.get("/my-trips", (req, res) => {
  // Fetch and display trips created by the user
});

// My Reviews Page
router.get("/my-reviews", (req, res) => {
  // Fetch and display reviews created by the user
});

// ---- Community Engagement and Content Enrichment Endpoints ----

// Community Contribution Endpoint
router.post("/api/contribute", (req, res) => {
  res.json({ message: "Community contribution endpoint placeholder" });
});

// Local Spotlight Endpoint
router.get("/api/local/spotlight", (req, res) => {
  res.json({ message: "Local spotlight endpoint placeholder" });
});

// Badge Reward System Endpoint
router.post("/api/rewards/badges", (req, res) => {
  res.json({ message: "Badge reward system endpoint placeholder" });
});

// User Feedback and Interaction Endpoint
router.post("/api/feedback", (req, res) => {
  res.json({ message: "User feedback endpoint placeholder" });
});

// User Engagement Analytics Endpoint
router.get("/api/engagement/metrics", (req, res) => {
  res.json({ message: "User engagement analytics endpoint placeholder" });
});

// Experience Rating and Review Endpoint
router.post("/api/experiences/rate", (req, res) => {
  res.json({ message: "Experience rating and review endpoint placeholder" });
});

// ---- Geo-Location Services Endpoints ----
router.get("/api/experiences/nearby", (req, res) => {
  res.json({
    message: "Geo-location services - nearby experiences endpoint placeholder",
  });
});

//Create experience endpoint
router.post("/api/experiences", async (req, res) => {
  try {
    const { title, description, coordinates, images, owner } = req.body;

    //Checking missing fields
    if (!title || !description || !coordinates || !images || !owner) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    //converting string to mongoose Object
    const ownerId = new mongoose.Types.ObjectId(owner);
    const location = { type: "Point", coordinates: coordinates };
    const result = await createExperience(
      title,
      description,
      location,
      images,
      ownerId
    );

    res
      .status(200)
      .json({ message: "Experience created successfully", result: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
});


router.get("/api/experiences/:id", (req, res) => {
  res.json({ message: "Experience detail endpoint placeholder" });
});


//Update experience/location endpoint
router.put("/api/experiences/:id/location", async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: id };
    const update = req.body;
    
    //updating location according to schema type
    if (update.coordinates) {
      const coordinates = update.coordinates;
      const newLocation = {
        type: "Point",
        coordinates: coordinates,
      };
      update.location = newLocation;
    }
    else{
        res.status(400).json({message: "Missing field corrdinates"})
    }

    const result = await updateExperience(filter, update);

    res.json({
      message: "Update experience location endpoint placeholder",
      result: result,
    });
  } catch (error) {
    res.status(500).json({message: "Internal Server error", error: error})
  }
});

router.delete("/api/experiences/:id", (req, res) => {
  res.json({ message: "Delete experience endpoint placeholder" });
});

// ---- Mapping Endpoints ----
router.get("/api/maps/routes/:userid", (req, res) => {
  res.json({ message: "Mapping routes endpoint placeholder" });
});

router.get("/api/maps/areas/:userid", (req, res) => {
  res.json({ message: "Mapping areas endpoint placeholder" });
});

router.post("/api/maps/annotations", (req, res) => {
  res.json({ message: "Mapping annotations endpoint placeholder" });
});

module.exports = router;
