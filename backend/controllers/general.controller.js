const general = require('express').Router();
const generalLogic = require('../logic/generalLogic');

general.delete("/announcements", (req, res, next) => {
    if (!req.session.user) { next("Please login"); }
    generalLogic.deleteAnnouncement(req.body.id, (err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.append("data", JSON.stringify(result));
        res.end();
    });
});

general.get("/announcement", (req, res, next) => {
    generalLogic.getAnnouncement(req.body.id, (err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.append("data", JSON.stringify(result));
        res.end();
    });
})

general.get("/announcements", (req, res, next) => {
    generalLogic.getAnnouncements((err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.append("data", JSON.stringify(result));
        res.end();
    });
});

general.post("/announcements", (req, res, next) => {
    if (!req.session.user) { next("Please login"); }
    generalLogic.insertAnnouncement(req.body.data, (err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.append("data", JSON.stringify(result));
        res.end();
    });
});

general.put("/announcements", (req, res, next) => {
    if (!req.session.user) { next("Please login"); }
    generalLogic.updateAnnouncement(req.body.id, (err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.append("data", JSON.stringify(result));
        res.end();
    });
});

general.delete("/contact", (req, res, next) => {
    if (!req.session.user) { next("Please login"); }
    generalLogic.deleteContact(req.body.id, (err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.append("data", JSON.stringify(result));
        res.end();
    });
});

general.get("/contact", (req, res, next) => {
    generalLogic.getContact((err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.append("data", JSON.stringify(result));
        res.end();
    });
});

general.post("/contact", (req, res, next) => {
    if (!req.session.user) { next("Please login"); }
    generalLogic.insertContact(req.body.data, (err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.append("data", JSON.stringify(result));
        res.end();
    });
});

general.put("/contact", (req, res, next) => {
    if (!req.session.user) { next("Please login"); }
    generalLogic.updateContact(req.body.id, req.body.data, (err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.append("data", JSON.stringify(result));
        res.end();
    });
});

general.delete("/event", (req, res, next) => {
    if (!req.session.user) { next("Please login"); }
    generalLogic.deleteEvent(req.body.id, (err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.append("data", JSON.stringify(result));
        res.end();
    });
});

general.get("/event", (req, res, next) => {
    generalLogic.getEvent(req.body.id, (err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.append("data", JSON.stringify(string));
        res.end();
    });
});

general.get("/events", (req, res, next) => {
    generalLogic.getEvents((err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.append("data", JSON.stringify(result));
        res.end();
    });
});

general.post("/events", (req, res, next) => {
    if (!req.session.user) { next("Please login"); }
    generalLogic.insertEvent(req.body.data, (err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.append("data", JSON.stringify(result));
        res.end();
    });
});

general.put("/events", (req, res, next) => {
    if (!req.session.user) { next(err); }
    generalLogic.updateEvent(req.body.id, req.body.data, (err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.append("data", JSON.stringify(result));
        res.end();
    });
});

general.delete("/landing_pictures", (req, res, next) => {
    if (!req.session.user) { next("Please login"); }
    generalLogic.deleteLandingPicture(req.body.id, (err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.append("data", JSON.stringify(result));
        res.end();
    });
});

general.get("/landing_pictures", (req, res, next) => {
    generalLogic.getLandingPicture((err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.append("data", JSON.stringify(result));
        res.end();
    });
});

general.post("/landing_pictures", (req, res, next) => {
    if (!req.session.user) { next("Please Login"); }
    generalLogic.insertLandingPicture(req.body.data, (err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.append("data", JSON.stringify(result));
        res.end();
    });
});

general.put("/landing_pictures", (req, res, next) => {
    if (!req.session.user) { next("Please login"); }
    generalLogic.updateLandingPicture(req.body.id, req.body.data, (err, result) => {
        if (err !== null) { next(err); }
        res.append("data", JSON.stringify(result));
        res.end();
    });
});

module.exports = general;
