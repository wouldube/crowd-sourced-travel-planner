require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const paths = require('./routes/paths')

const app = express()
const port = process.env.PORT

// routes
app.use('/', paths)

// connect to db
mongoose.connect(process.env.DB_LINK)
    .then(() => {})
    .catch((error) => {
        console.log(error)
    })

// listen for requests
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });