const sign = require('jsonwebtoken').sign;

const dbCrud = require('./database-crud');

//  -------------------------- Announcement CRUD ---------------------------

function deleteAnnouncements (id, cb) {
    dbCrud.mongoDELETE("announcements", {_id: id})
          .then(result => cb(null, result))
          .catch(err => cb(err, null));
}

function getAnnouncement (id, cb) {
    dbCrud.mongoGET("annoucements", {_id: id})
          .then(result => cb(null, result))
          .catch(err => cb(err, null));
}

function getAnnouncements (cb) {
    dbCrud.mongoAggregate("announcements", [{
        "$facet": {
            "announceTop10": [
                { "$sort": { "created": 1 } },
                { "$limit": 10 }
            ]
        }
    }])
    .then(result => cb(null, result))
    .catch(err => cb(err, null));
}

function insertAnnouncement (data, cb) {
    dbCrud.mongoInsert("announcements", data)
          .then(result => cb(null, result))
          .catch(err => cb(err, null));
}

function updateAnnouncement (id ,data, cb) {
    dbCrud.mongoUPDATE("announcements", {
        "_id": id
    }, data)
    .then(result => cb(null, result))
    .catch(err => cb(err, null));
}

//  ----------------------------- Contact CRUD -----------------------------

function deleteContact (id, cb) {
    dbCrud.mongoDELETE("contact", {_id: id})
          .then(result => cb(null, result))
          .catch(err => cb(err, null));
}

function getContact (cb) {
    dbCrud.mongoGET("contact", {})
    .then(result => cb(null, result))
    .catch(err => cb(err, null));
}

function insertContact (data, cb) {
    dbCrud.mongoInsert("contact", data)
          .then(result => cb(null, result))
          .catch(err => cb(err, null));
}

function updateContact (id ,data, cb) {
    dbCrud.mongoUPDATE("contact", {
        "_id": id
    }, data)
    .then(result => cb(null, result))
    .catch(err => cb(err, null));
}

// -------------------------- Events CRUD --------------------------------

function deleteEvent (id, cb) {
    dbCrud.mongoDELETE("events", {_id: id})
          .then(result => cb(null, result))
          .catch(err => cb(err, null));
}

function getEvent (id, cb) {
    dbCrud.mongoGET("events", {"_id": id})
    .then(result => cb(null, result))
    .catch(err => cb(err, null));
}

function getEvents (cb) {
    dbCrud.mongoAggregate("events", [{
        "$facet": {
            "announceTop10": [
                { "$sort": { "created": 1 } },
                { "$limit": 10 }
            ]
        }
    }])
    .then(result => cb(null, result))
    .catch(err => cb(err, null));
}

function insertEvent (data, cb) {
    dbCrud.mongoInsert("events", data)
          .then(result => cb(null, result))
          .catch(err => cb(err, null));
}

function updateEvent (id ,data, cb) {
    dbCrud.mongoUPDATE("events", {
        "_id": id
    }, data)
    .then(result => cb(null, result))
    .catch(err => cb(err, null));
}

// -------------------------- Landing Pictures CRUD ----------------------

function deleteLandingPicture (id, cb) {
    dbCrud.mongoDELETE("landing_pictures", {_id: id})
          .then(result => cb(null, result))
          .catch(err => cb(err, null));
}

function getLandingPicture (cb) {
    dbCrud.mongoGET("landing_pictures", {})
    .then(result => cb(null, result))
    .catch(err => cb(err, null));
}

function insertLandingPicture (data, cb) {
    dbCrud.mongoInsert("landing_pictures", { name: data.name, idx: data.idx, data: data.data})
          .then(result => cb(null, result))
          .catch(err => cb(err, null));
}

function updateLandingPicture (id ,data, cb) {
    dbCrud.mongoUPDATE("landing_pictures", {
        "_id": id
    }, data)
    .then(result => cb(null, result))
    .catch(err => cb(err, null));
}

module.exports = {
    deleteAnnouncements, getAnnouncement, getAnnouncements, insertAnnouncement, updateAnnouncement,
    deleteContact, getContact, insertContact, updateContact,
    deleteEvent, getEvent, getEvents, insertEvent, updateEvent,
    deleteLandingPicture, getLandingPicture, insertLandingPicture, updateLandingPicture,
}
