const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const mongoose = require('mongoose');
const users = require('./routes/user');
const search = require('./routes/search');
const db = require('./config/keys').mongoURI;

// Body Parser Middleware Setup 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Security Setup 
app.use(xss());
app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());

// DB Setup
mongoose.connect(db)
    .then(() => console.log('DB Successful Connection'))
    .catch(err => console.log(err));

// Route Configuration
app.use('/users', users);
// app.use('/profile', profiles);
app.use('/search', search);

const port = process.env.PORT || 5000; 

app.listen(port, () => console.log(`Server Listening Port ${port}`));