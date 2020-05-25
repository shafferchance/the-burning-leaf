const dotenv = require("dotenv");
const express = require('express');
// const session = require('express-session');
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');
// const MongoStore = require('connect-mongo')(session);
// const { v4: uuidv5 } = require('uuid');

const fs = require('fs');
const path = require('path');
const https = require('https');

const db = require('./logic/database-login');
const about = require('./controllers/about.controller.js');
const general = require('./controllers/general.controller.js');
const inv = require('./controllers/inventory.controller.js');
const users = require('./controllers/users.controller.js');

dotenv.config();
const app = express();

// let url = "mongodb://normie:W3c{}://!@cigar.temporaltech.app/?authSource=admin";
db.connect();

app.use((req, res, next) => {
    switch (req.method) {
        case 'OPTIONS':
            res.append('Access-Control-Allow-Origin',"*");
            res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.append('Access-Control-Allow-Headers','Content-Type,X-Auth-Header');
            break;
        default:
            res.append('Access-Control-Allow-Origin', "*");
    }
    next();
});

// app.use(session({
//     genid: function (req) {
//         return uuidv5();
//     },
//     touchAfter: 24 * 3600,
//     secret: 'das;ovihd;alsidfagoisgya;osldifasdfpoasdivy;lh',
//     store: new MongoStore({
//         url: process.env.NODE_ENV === 'production' ?
//                 process.env.DB_CONN_S : process.env.DB_CONN_LOCAL_S
//     })
// }));

app.use(bodyParser({ limit: '4MB' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(mongoSanitize({
    replaceWith: '_'
}));

app.use((req, res, next) => {
    console.log(req.path);
    next();
});
app.use(express.static(path.resolve('..','static')));
app.use('/api/v1/about', about);
app.use('/api/v1/general', general);
app.use('/api/v1/inv', inv);
app.use('/api/v1/users', users);
// app.use('/hello', (req, res, next) => {
//     res.append("data", "hello");
//     res.end();
// });

app.listen(3000, () => console.log("Listening on port 3000"));
/*https.createServer({
    key: fs.readFileSync(process.env.NODE_ENV === 'VS_CODE' ?
                            "backend\\server.key" : "server.key"),
    cert: fs.readFileSync(process.env.NODE_ENV === 'VS_CODE' ?
                            "backend\\server.cert" : "server.cert")
}, app).listen(8443, () => console.log("Listening on 8443"));*/
