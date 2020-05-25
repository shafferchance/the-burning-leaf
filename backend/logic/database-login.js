// const MongoClient = require('mongodb').MongoClient;

// const AUTH = "DEFAULT"
// const DB_NAME = "cigar_store";
// const URL = 'cigar.temporaltech.app'; // On local instance, may move to a config or env var soonish
// const USER = { user: "normie", passwd: "W3c{}://!"}

// /**
//  * 
//  * @param {Object} [user = User] - User object containing username and password
//  * @param {String} [dbName = DB_NAME] - Database that the client will be connected to
//  * @param {String} [authMech = AUTH] - Mechanism to conduct authenication
//  * 
//  * @returns {Promise} Resolves with 2-tuple of datbase
//  */
// export const DBConnect = (user = USER, dbName = DB_NAME) => {
//     const client = new MongoClient(`mongodb://${encodeURIComponent(user["user"])}:${encodeURIComponent(user["passwd"])}@${URL}?authSource=admin`);
//     return new Promise((res, rej) => {
//         client.connect(err => {
//             if (err) 
//             {
//                 rej(err);
//             }
//             console.log("Connected successfully to server");
//             res([client.db(dbName), client]); // Will return 2-tuple containing database and client connection
//         });
//     });
// }
const jwt = require('jsonwebtoken');
const mongoClient = require("mongodb").MongoClient;
let clientConn;
let mongodb;

function connect (cb) {
    console.log(process.env.NODE_ENV === 'production' ? 
    process.env.DB_CONN : process.env.DB_CONN_LOCAL)
    mongoClient.connect(process.env.NODE_ENV === 'production' ? 
                            process.env.DB_CONN : process.env.DB_CONN_LOCAL, {
        poolSize: 10,
        useUnifiedTopology: true
    }, function(err, client) {
        if (err !== null) { throw TypeError(err); }
        clientConn = client;
        mongodb = clientConn.db("cigarShop");
        if (cb !== undefined) { cb() }
    });
}

function get () {
    return mongodb;
}

function close () {
    clientConn.close();
}

function genJWT (userId, role = "user") {
    return new Promise((res, rej) => {
        jwt.sign({
            _id: userId,
            role: role,
        },
        process.env.SECRET,
        {
            expiresIn: '1h'
        },
        (err, token) => {
            if (err) rej(err);
                res(token);
        })
    })
}

module.exports = {
    connect,
    genJWT,
    get,
    close
};
