const general = require('express').Router();
const generalLogic = require('../logic/generalLogic');
const isRole = require('../middle/auth');

general.delete("/announcements", isRole, (req, res, next) => {
    generalLogic.deleteAnnouncement(req.body.id, (err, result) => {
        if (err !== null) { next(err); }
        return res.status(200)
                  .json({"data": result})
                  .end();
    });
});

general.get("/announcement", (req, res, next) => {
    generalLogic.getAnnouncement(req.body.id, (err, result) => {
        if (err !== null) { return next(err); }
        return res.status(200)
                  .json({"data": result})
                  .end();
    });
})

general.get("/announcement_list", (reqq, res, next) => {
    generalLogic.getAnnouncementList((err, result) => {
        if (err !== null) { return next(err); }
        return res.status(200)
                  .json({"data": result})
                  .end();
    })
})

general.get("/announcements", (req, res, next) => {
    generalLogic.getAnnouncements((err, result) => {
        if (err !== null) { return next(err); }
        return res.status(200)
                  .json({"data": result})
                  .end();
    });
});

general.post("/announcements", isRole, (req, res, next) => {
    generalLogic.insertAnnouncement(req.body, (err, result) => {
        if (err !== null) { return next(err); }
        return res.status(200)
                  .json({"data": result})
                  .end();
    });
});

general.put("/announcements", isRole, (req, res, next) => {
    generalLogic.updateAnnouncement(req.body.id, (err, result) => {
        if (err !== null) { return next(err); }
        return res.status(200)
                  .json({"data": result})
                  .end();
    });
});

general.delete("/contact", isRole, (req, res, next) => {
    generalLogic.deleteContact(req.body.id, (err, result) => {
        if (err !== null) { return next(err); }
        return res.status(200)
                  .json({"data": result})
                  .end();
    });
});

general.get("/contact", (req, res, next) => {
    generalLogic.getContact((err, result) => {
        if (err !== null) { return next(err); }
        return res.status(200)
                  .json({"data": result})
                  .end();
    });
});

general.post("/contact", isRole, (req, res, next) => {
    generalLogic.insertContact(req.body.data, (err, result) => {
        if (err !== null) { return next(err); }
        return res.status(200)
                  .json({"data": result})
                  .end();
    });
});

general.put("/contact", isRole, (req, res, next) => {
    generalLogic.updateContact(req.body.id, req.body.data, (err, result) => {
        if (err !== null) { return next(err); }
        return res.status(200)
                  .json({"data": result})
                  .end();
    });
});

general.delete("/event", isRole, (req, res, next) => {
    generalLogic.deleteEvent(req.body.id, (err, result) => {
        if (err !== null) { return next(err); }
        return res.status(200)
                  .json({"data": result})
                  .end();
    });
});

general.get("/event", (req, res, next) => {
    generalLogic.getEvent(req.body.id, (err, result) => {
        if (err !== null) { return next(err); }
        return res.status(200)
                  .json({"data": string})
                  .end();
    });
});

general.get("/events", (req, res, next) => {
    generalLogic.getEvents((err, result) => {
        if (err !== null) { return next(err); }
        return res.status(200)
                  .json({"data": result})
                  .end();
    });
});

general.post("/events", isRole, (req, res, next) => {
    generalLogic.insertEvent(req.body.data, (err, result) => {
        if (err !== null) { return next(err); }
        return res.status(200)
                  .json({"data": result})
                  .end();
    });
});

general.put("/events", isRole, (req, res, next) => {
    if (!req.session.user) { next(err); }
    generalLogic.updateEvent(req.body.id, req.body.data, (err, result) => {
        if (err !== null) { return next(err); }
        return res.status(200)
                  .json({"data": result})
                  .end();
    });
});

general.delete("/landing_pictures", isRole, (req, res, next) => {
    generalLogic.deleteLandingPicture(req.body.id, (err, result) => {
        if (err !== null) { return next(err); }
        return res.status(200)
                  .json({"data": result})
                  .end();
    });
});

general.get("/landing_pictures", (req, res, next) => {
    generalLogic.getLandingPicture((err, result) => {
        if (err !== null) { return next(err); }
        return res.status(200)
                  .json({"data": result})
                  .end();
    });
});

general.post("/landing_pictures", isRole, (req, res, next) => {
    generalLogic.insertLandingPicture(req.body, (err, result) => {
        if (err !== null) { return next(err); }
        return res.status(200)
                  .json({"data": result})
                  .end();
    });
});

general.put("/landing_pictures", isRole, (req, res, next) => {
    generalLogic.updateLandingPicture(req.body.id, req.body.data, (err, result) => {
        if (err !== null) { next(err); }
        return res.status(200)
                  .json({"data": result})
                  .end();
    });
});

// general.post("/login", (req, res, next) => {
//     //console.log(req.body);
//     generalLogic.login(req.body.user, req.body.pword, (err, same) => {
// 	//console.log(err);	
//         if (err !== null) next(err);
//         if (same === true) {
//             req.session.authenticated = true;
//             res.write('{"result":"success"}');
//             res.status(200);
//             res.end();
//         } else {
//             res.write('{"err":"Failed to login"}');
//             res.status(403);
//             res.end();
//         }
//     })
// });

module.exports = general;
