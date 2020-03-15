const express = require('express');
const path = require('path');

const about = require('./controllers/about.controller.js');
const general = require('./controllers/general.controller.js');
const inv = require('./controllers/inventory.controller.js');

const app = express();

app.use(express.static(path.resolve('..','frontend','public')));
app.use('/about', about);
app.use('/general', general);
app.use('/inv', inv);

app.listen(8000, () => console.log("Listening on port 8000"));