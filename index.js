const express = require('express') // calling express
const app = express() // creating express app
const port = 3000 // defining port

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// listening on port 3000
app.listen(port, () => {
    console.log(`Your app listening at http://localhost:${port}`)
})