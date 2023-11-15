const express = require('express')
import { User, Experience, Trip, Review } from '../models/schema'

// uncomment when controller functions have been created
// const { CRUD func names } = require('../controllers/{controller.js name})

const router = express.Router()

router.get('/', (req, res) => {
    //code here for GET req to '/'
    res.json('hello world')
})

router.post('/', (req, res) => {
    //code here for POST req to '/'
})

module.exports = router