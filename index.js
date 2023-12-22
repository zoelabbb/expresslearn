const express = require('express') // calling express
require('dotenv').config() // Import .env file
const port = process.env.APP_PORT
const app = express() // creating express app
const postRouter = require('./routes/posts') // Import post router
const bodyParser = require('body-parser') //import body parser
const cors = require('cors') //import cors

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(cors()) // use cors and import cors
app.use('/api/posts', postRouter) // use post router

app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json

// listening on port from env file
app.listen(port, () => {
    console.log(`Your app listening at http://localhost:${process.env.APP_PORT}`)
})