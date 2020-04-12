const dbConn = require("./database-login");

function Location (address) {
    this.address = address;
}

function Event (name, desc, date) {
    this.name = name;
    this.desc = desc;
    this.date = date;
}

function Announcement (name, msg, date, importance="mid") {
    this.name = name;
    this.msg = msg;
    this.date = date;
    this.importance = importance;
}

function DayHours (DoW, open, close) {
    this.open = open;
    this.close = close;
    this.DoW = DoW;
}

function Amenity (name, desc, pic) {
    this.name = name;
    this.desc = desc;
    this.pic = pic;
}

function mongoAggregate (collection, aggregate) {
    return new Promise((res, rej) => {
        dbConn.get()
          .collection(collection)
          .aggregate(aggregate, (err, result) => {
              if (result !== null) { rej(err); }
              res(result);
          })
    });
}

function mongoDELETE (collection, query, opts) {
    return new Promise((res, rej) => {
        dbConn.get()
          .collection(collection)
          .findOneAndDelete(query, opts, (err, result) => {
            if (result !== null) { rej(err); }
            res(result);
        });
    });
}

function mongoGET (collection, query) {
    return new Promise((res, rej) => {
        dbConn.get()
          .collection(collection)
          .find(query === undefined ? {} : query, (err, result) => {
            if (err !== null) { rej(err); }
            res(result);
        });
    });
}

function mongoGETOne (collection, query, opts) {
    return new Promise((res, rej) => {
        dbConn.get()
          .collection(collection)
          .findOne(query, opts, (err, result) => {
            if (result !== null) { rej(err); }
            res(result);
        });
    });
}

function mongoInsert (collection, entries) {
    return new Promise((res, rej) => {
        if (entries instanceof Array) {
            dbConn.get()
              .collection(collection)
              .insertMany(entries, (err, result) => {
                  if (err !== null) { rej(err); }
                  res(result);
              });
        }
        dbConn.get()
          .collection(collection)
          .insertOne(entries, (err, result) => {
            if (err !== null) { rej(err); }
            res(result);
          });
    })
}

function mongoUPDATE (collection, query, newVal, opts = {}) {
    return new Promise((res, rej) => {
        dbConn.get()
          .collection(collection)
          .findOneAndUpdate(query, newVal, opts, (err, result) => {
                if (err !== null) { rej(err); }
                res(result);
        });
    });
}

module.exports = {
    Location, Event, Announcement, Amenity, DayHours,
    mongoGET, mongoGETOne, mongoUPDATE, mongoDELETE,
    mongoAggregate, mongoUPDATE, mongoInsert
}