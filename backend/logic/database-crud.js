import DBConnect from './database-login'

const connectAttempt = DBConnect()
                        .then(x => x)
                        .catch(err => console.error(err));

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

function mongoGET (collection, query) {
    return connectAttempt.then(db => {
        if (query === undefined) {
            return db.collection(collection).find()
        }
        return db.collection(collection).find(query);
    });
}

function mongoUPDATE (collection, query, newVal, opts) {
    return connectAttempt.then(db => {
        db.collection(collection).findOneAndUpdate(query, newVal, opts, res => {
            return res
        });
    });
}

function mongoDELETE (collection, query, opts) {
    return db.collection(collection).findOneAndDelete(query, opts, res => {
        return res;
    });
}

function mongoGETOne (collection, query, opts) {
    return db.collection(collection).findOne(query, opts, res => {
        return res
    });
}

module.exports = {
    Location, Event, Announcement, Amenity, DayHours,
    mongoGET, mongoGETOne, mongoUPDATE, mongoDELETE
}