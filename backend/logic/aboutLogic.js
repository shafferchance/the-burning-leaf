const dbCrud = require('./database-crud');

function getAbout (cb) {
    dbCrud.mongoGET("about", {})
          .then(result => cb(null, result))
          .catch(err => cb(err, null));
}

function updateAbout (data, cb) {
    dbCrud.mongoUPDATE("about", {}, data)
          .then(result => cb(null, result))
          .catch(err => cb(err, null));
}

function getHours (cb) {
    dbCrud.mongoGET("hours", {})
          .then(result => cb(null, result))
          .catch(err => cb(err, null));
}

function updateHours (day, data, cb) {
    dbCrud.mongoUPDATE(
        "hours", {"day": day },
        data)
        .then(results => cb(null, results))
        .catch(err => cb(err, null));
}

function getLocation (cb) {
    dbCrud.mongoGET("location", {})
          .then(result => cb(null, result))
          .catch(err => cb(err, null));
}

function updateLocation (data, cb) {
    dbCrud.mongoUPDATE("location", {}, data)
          .then(results => cb(null, results))
          .catch(err => cb(err, null));
}

function deleteAmenity (id, cb) {
    dbCrud.mongoDELETE("amenties", { "_id": id })
          .then(results => cb(null, results))
          .catch(err => cb(err, null));
}

function getAmenity (cb) {
    dbCrud.mongoGET("amenties", {})
          .then(results => cb(null, results))
          .catch(err => cb(err, null));
}

function postAmenity (data, cb) {
    dbCrud.mongoInsert("amenties", data)
          .then(result => cb(null, result))
          .catch(err => cb(err, null));
}

function updateAmenity (id, data, cb) {
    dbCrud.mongoUPDATE("amenties", {"_id": id}, data)
          .then(results => cb(null, results))
          .catch(err => cb(err, null));
}

module.exports = {
    getAbout, updateAbout,
    getHours, updateHours,
    getLocation, updateLocation,
    deleteAmenity, getAmenity, postAmenity, updateAmenity
}