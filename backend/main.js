const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// mongoose.connect('mongodb://normie:W3c{}://!@cigar.temporaltech.app/?authSource=admin', {useNewUrlParser: true});
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//     console.log("Database connected");
// });

const about = require('./controllers/about.controller.js');
const general = require('./controllers/general.controller.js');
const inv = require('./controllers/inventory.controller.js');

const app = express();

app.use(express.static(path.resolve('..','static')));
app.use('/api/v1/about', about);
app.use('/api/v1/general', general);
app.use('/api/v1/inv', inv);

app.listen(8000, () => console.log("Listening on port 8000"));