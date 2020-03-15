const MongoClient = require('mongodb').MongoClient;

const AUTH = "DEFAULT"
const DB_NAME = "cigar_store";
const URL = 'localhost:27017'; // On local instance, may move to a config or env var soonish
const USER = { user: "reader", passwd: "WZ6A%UjHNCu;}e},"}

/**
 * 
 * @param {Object} [user = User] - User object containing username and password
 * @param {String} [dbName = DB_NAME] - Database that the client will be connected to
 * @param {String} [authMech = AUTH] - Mechanism to conduct authenication
 * 
 * @returns {Promise} Resolves with 2-tuple of datbase
 */
export const connect = (user = USER, dbName = DB_NAME, authMech = AUTH) => {
    const client = new MongoClient(`mongodb://${encodeURIComponent(user["user"])}:${encodeURIComponent(user["passwd"])}@${URL}?authMechanism=${authMech}`);
    return new Promise((res, rej) => {
        client.connect(err => {
            if (err) 
            {
                rej(err);
            }
            console.log("Connected successfully to server");
            res([client.db(dbName), client]); // Will return 2-tuple containing database and client connection
        });
    });
}