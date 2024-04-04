const express = require('express');

const cors = require('cors');

const mongo = require('./mongo');

const app = express();

const PORT = 8080;

const options = { exposedHeaders: ['Authorization'] };

// middleware to enable cors
app.use(cors(options));

app.use(express.json());

// require in our resource routes
const users = require('./api/users/user.routes.js');
const snippets = require('./api/snippets/snippet.routes.js');
const bookmarks = require('./api/bookmarks/bookmark.routes.js');

// mount the resource routes to our express app
app.use('/users', users);
app.use('/snippets', snippets);
app.use('/bookmarks', bookmarks);

// start the express server and connect to mongo
app.listen(PORT, async () => {
    console.log(`Server is listening on port ${PORT}`);
    await mongo.connectDB();
});
