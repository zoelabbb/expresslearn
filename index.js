const express = require('express') // calling express
const app = express() // creating express app
const port = 3000 // defining port
const postRouter = require('./routes/posts') // Import post router
const bodyParser = require('body-parser') //import body parser

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// use post router
app.use('/api/posts', postRouter)

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// listening on port 3000
app.listen(port, () => {
    console.log(`Your app listening at http://localhost:${port}`)
})