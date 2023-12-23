const express = require('express');
require('dotenv').config();
const port = process.env.APP_PORT;
const app = express();
const postRouter = require('./routes/posts');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(cors()); // use cors

app.use('/api/posts', postRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// listening on port from env file
app.listen(port, () => {
    console.log(`Your app listening at http://localhost:${process.env.APP_PORT}`);
});