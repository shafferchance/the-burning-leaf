const general = require('express').Router();
const generalLogic = require('../logic/generalLogic');

general.delete("/announcements", (req, res, next) => {
    if (!req.session.authenticated) { next("Please login"); }
    generalLogic.deleteAnnouncement(req.body.id, (err, result) => {
        if (err !== null) { next(err); }
        res.status(200);
        res.write(JSON.stringify({"data": result}));
        res.end();
        return res;
    });
});

general.get("/announcement", (req, res, next) => {
    generalLogic.getAnnouncement(req.body.id, (err, result) => {
        if (err !== null) { return next(err); }
        res.status(200);
        res.write(JSON.stringify({"data": result}));
        res.end();
        return res;
    });
})

general.get("/announcements", (req, res, next) => {
    generalLogic.getAnnouncements((err, result) => {
        if (err !== null) { return next(err); }
        res.status(200);
        res.write(JSON.stringify({"data": result}));
        res.end();
        return res;
    });
});

general.post("/announcements", (req, res, next) => {
    if (!req.session.authenticated) { next("Please login"); }
    generalLogic.insertAnnouncement(req.body.data, (err, result) => {
        if (err !== null) { return next(err); }
        res.status(200);
        res.write(JSON.stringify({"data": result}));
        res.end();
        return res;
    });
});

general.put("/announcements", (req, res, next) => {
    if (!req.session.authenticated) { next("Please login"); }
    generalLogic.updateAnnouncement(req.body.id, (err, result) => {
        if (err !== null) { return next(err); }
        res.status(200);
        res.write(JSON.stringify({"data": result}));
        res.end();
        return res;
    });
});

general.delete("/contact", (req, res, next) => {
    if (!req.session.authenticated) { next("Please login"); }
    generalLogic.deleteContact(req.body.id, (err, result) => {
        if (err !== null) { return next(err); }
        res.status(200);
        res.write(JSON.stringify({"data": result}));
        res.end();
        return res;
    });
});

general.get("/contact", (req, res, next) => {
    generalLogic.getContact((err, result) => {
        if (err !== null) { return next(err); }
        res.status(200);
        res.write(JSON.stringify({"data": result}));
        res.end();
        return res;
    });
});

general.post("/contact", (req, res, next) => {
    if (!req.session.authenticated) { next("Please login"); }
    generalLogic.insertContact(req.body.data, (err, result) => {
        if (err !== null) { return next(err); }
        res.status(200);
        res.write(JSON.stringify({"data": result}));
        res.end();
        return res;
    });
});

general.put("/contact", (req, res, next) => {
    if (!req.session.authenticated) { next("Please login"); }
    generalLogic.updateContact(req.body.id, req.body.data, (err, result) => {
        if (err !== null) { return next(err); }
        res.status(200);
        res.write(JSON.stringify({"data": result}));
        res.end();
        return res;
    });
});

general.delete("/event", (req, res, next) => {
    if (!req.session.authenticated) { next("Please login"); }
    generalLogic.deleteEvent(req.body.id, (err, result) => {
        if (err !== null) { return next(err); }
        res.status(200);
        res.write(JSON.stringify({"data": result}));
        res.end();
        return res;
    });
});

general.get("/event", (req, res, next) => {
    generalLogic.getEvent(req.body.id, (err, result) => {
        if (err !== null) { return next(err); }
        res.status(200);
        res.append("data", JSON.stringify(string));
        res.end();
    });
});

general.get("/events", (req, res, next) => {
    generalLogic.getEvents((err, result) => {
        if (err !== null) { return next(err); }
        res.status(200);
        res.write(JSON.stringify({"data": result}));
        res.end();
        return res;
    });
});

general.post("/events", (req, res, next) => {
    if (!req.session.authenticated) { next("Please login"); }
    generalLogic.insertEvent(req.body.data, (err, result) => {
        if (err !== null) { return next(err); }
        res.status(200);
        res.write(JSON.stringify({"data": result}));
        res.end();
        return res;
    });
});

general.put("/events", (req, res, next) => {
    if (!req.session.user) { next(err); }
    generalLogic.updateEvent(req.body.id, req.body.data, (err, result) => {
        if (err !== null) { return next(err); }
        res.status(200);
        res.write(JSON.stringify({"data": result}));
        res.end();
        return res;
    });
});

general.delete("/landing_pictures", (req, res, next) => {
    if (!req.session.authenticated) { next("Please login"); }
    generalLogic.deleteLandingPicture(req.body.id, (err, result) => {
        if (err !== null) { return next(err); }
        res.status(200);
        res.write(JSON.stringify({"data": result}));
        res.end();
        return res;
    });
});

general.get("/landing_pictures", (req, res, next) => {
    generalLogic.getLandingPicture((err, result) => {
        if (err !== null) { return next(err); }
        res.status(200);
        res.write(JSON.stringify({"data": result}));
        res.end();
        return res;
    });
});

general.post("/landing_pictures", (req, res, next) => {
    if (!req.session.authenticated) { next("Please login"); }
    generalLogic.insertLandingPicture(req.body.data, (err, result) => {
        if (err !== null) { return next(err); }
        res.status(200);
        res.write(JSON.stringify({"data": result}));
        res.end();
        return res;
    });
});

general.put("/landing_pictures", (req, res, next) => {
    if (!req.session.authenticated) { next("Please login"); }
    generalLogic.updateLandingPicture(req.body.id, req.body.data, (err, result) => {
        if (err !== null) { next(err); }
        res.write(JSON.stringify({"data": result}));
        res.end();
        return res;
    });
});

general.post("/login", (req, res, next) => {
    //console.log(req.body);
    generalLogic.login(req.body.user, req.body.pword, (err, same) => {
	//console.log(err);	
        if (err !== null) next(err);
        if (same === true) {
            req.session.authenticated = true;
            res.write('{"result":"success"}');
            res.status(200);
            res.end();
        } else {
            res.write('{"err":"Failed to login"}');
            res.status(403);
            res.end();
        }
    })
});

module.exports = general;
