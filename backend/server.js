const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoClient = require('mongodb').MongoClient;
const path = require('path');

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3003', // Update with your frontend URL
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}));

// Deploy React build in this server
app.use(express.static(path.join(__dirname, '../client/build')));

// To parse the body of req
app.use(express.json());

// Connect to DB
mongoClient.connect(process.env.DB_URL)
  .then(client => {
    const blogdb = client.db('blogdb');
    const userscollection = blogdb.collection('userscollection');
    const articlescollection = blogdb.collection('articlescollection');
    const authorsCollection = blogdb.collection('authorsCollection');
    app.set('userscollection', userscollection);
    app.set('articlescollection', articlescollection);
    app.set('authorsCollection', authorsCollection);
    console.log("DB connection success");
  })
  .catch(err => console.log("Err in DB connection", err));

// Import API routes
const userApp = require('./APIs/user-api');
const authorApp = require('./APIs/author-api');
const adminApp = require('./APIs/admin-api');

app.use('/user-api', userApp);
app.use('/admin-api', adminApp);
app.use('/author-api', authorApp);

// Deals with page refresh
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Express error handler
app.use((err, req, res, next) => {
  res.status(500).send({ message: "error", payload: err.message });
});

// Assign port number
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`web server on port ${port}`));
