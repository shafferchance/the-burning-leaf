const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://normie:W3c{}://!@cigar.temporaltech.app/?authSource=admin', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Database connected");
});

const app = express();

app.use(express.static(path.resolve('..','frontend','public')));

app.listen(8000, () => console.log("Listening on port 8000"));