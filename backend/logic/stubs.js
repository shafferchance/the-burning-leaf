const inv = {};

// Inventory

function getInv () {
    return inv;
}

function getEle (key) {
    return inv[key];
}

function addInv (key, value) {
    inv[key] = value;
    return true;
}

function updateInv (key, value) {
    inv[key] = value;
    throw TypeError("Entry does not exist");
}

function delInv (key) {
    delete inv[key];
}

function markPopular (key) {
    inv.popular.unshift(key);
}

function getPopular () {
    let objects = [];
    inv.popular.map(ele => {
        objects.unshift(inv[ele]);
    })
    return objects;
}

// About
const about = {
    hours: {},
    location: "",
    amenities: {}
};

function getAbout () {
    return about;
}

function updateAbout (key, value) {
    about[key] = value;
    return;
}

function deleteAbout (key) {
    delete about[key];
}

function getHours () {
    return about.hours;
}

function setHours (key, value) {
    about.hours[key] = value;
}

// Location

function getLocation () {
    return about.location;
}

function updateLocation (value) {
    about["location"] = value;
}
 
// Should probably just not be here
function deleteLocation () {
    delete about["location"];
}

// Amenities 

function getAmenities () {
    return about.amenities;
}

function updateAmenity (key, value) {
    about.amenities[key] = value;
}

function deleteAmenity (key) {
    delete about.amenities[key];
}

// Contact
const contact = {
    phone: "",
    email: ""
}

function getContact () {
    return contact;
}

function updateContact (key, value) {
    contact[key] = value;
}

// Announcement
const Announcement = [];

function getAnnouncement () {
    return Announcement;
}

function addAnnouncement (key, value) {
    Announcement[key] = value;
}

function delAnnouncement (key) {
    delete Announcement[key];
}

//Events
const eves = [];

function getEvents () {
    return eves;
}

function addEvent (eve) {
    eves.unshift(eve);
    return eves;
}

function delEvent (eve) {
    delete eves[eves.indexOf(eve)];
}

function updateEvent (eve, newEve) {
    eves[eves.indexOf(eve)] = newEve;
    return eves;
}

// Landing pictures
const landingPics = [];

function getLanding () {
    return landingPics;
}

function addLanding (pic) {
    landingPics.unshift(pic);
}

function delLanding (pic) {
    delete landingPics[landingPics.indexOf(pic)];
}

module.exports = {
    getInv, getEle, addInv, updateInv, delInv, markPopular, getPopular,
    getAbout, updateAbout, deleteAbout, 
    getHours, updateHours, setHours,
    getLocation, updateLocation, deleteLocation,
    getAmenities, updateAmenity, deleteAmenity,
    getContact, updateContact,
    getAnnouncement, addAnnouncement, delAnnouncement,
    getEvents, updateEvent, addEvent, delEvent,
    getLanding, addLanding, delLanding
};
