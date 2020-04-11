const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo').MongoStore;
const path = require('path');
const uuidv5 = require("uuid/v5");
const db = require('./logic/database-login');

const about = require('./controllers/about.controller.js');
const general = require('./controllers/general.controller.js');
const inv = require('./controllers/inventory.controller.js');
const session = require('./logic/session');
const app = express();

// let url = "mongodb://normie:W3c{}://!@cigar.temporaltech.app/?authSource=admin";

app.use((req, res, next) => {
    switch (req.method) {
        case 'OPTIONS':
            res.append('Access-Control-Allow-Origin', ["https://cigar.temporaltech.app", "*"]);
            res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.append('Access-Control-Allow-Headers','Content-Type,X-Session');
            break;
        default:
            res.append('Access-Control-Allow-Origin', ["https://cigar.temporaltech.app", "*"]);
    }
    next();
});

app.use(session({
    genid: function (req) {
        return uuidv5();
    },
    touchAfter: 24 * 3600,
    secret: 'das;ovihd;alsidfagoisgya;osldifasdfpoasdivy;lh',
    store: new MongoStore({
        ur: process.env.NODE_ENV === 'production' ?
                process.env.DB_CONN_S : process.env.DB_CONN_LOCAL_S
    })
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// TODO: Add SSE support for events, announcements, or stock changes
app.use(express.static(path.resolve('..','static')));
app.use('/api/v1/about', about);
app.use('/api/v1/general', general);
app.use('/api/v1/inv', inv);

app.listen(8000, () => console.log("Listening on port 8000"));