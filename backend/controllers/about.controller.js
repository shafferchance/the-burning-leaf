const about = require("express").Router();
const aboutLogic = require("../logic/aboutLogic");
const isRole = require("../middle/auth");

about.get("/", (req, res, next) => {
    aboutLogic.getAbout((err, result) => {
        if (err !== null) {
            next(err);
        }
        return res.status(200).json({ data: result });
    });
});

about.put("/", isRole, (req, res, next) => {
    aboutLogic.updateAbout(req.body.data, (err, result) => {
        if (err !== null) {
            next(err);
        }
        return res.status(200).json({ data: result });
    });
});

// Omitting delete for now

about.get("/hours", (req, res, next) => {
    aboutLogic.getHours((err, result) => {
        if (err !== null) {
            next(err);
        }
        return res.status(200).json({ data: result });
    });
});

about.put("/hours", isRole, (req, res, next) => {
    aboutLogic.updateHours(req.body.id, req.body.data, (err, result) => {
        if (err !== null) {
            next(err);
        }
        return res.status(200).json({ data: result });
    });
});

// Omitting delete for now

about.get("/location", (req, res, next) => {
    aboutLogic.getLocation((err, result) => {
        if (err !== null) {
            next(err);
        }
        return res.status(200).json({ data: result });
    });
});

about.put("/location", isRole, (req, res, next) => {
    aboutLogic.updateLocation(req.body.data, (err, result) => {
        if (err !== null) {
            next(err);
        }
        return res.status(200).json({ data: result });
    });
});

about.delete("/amenties", isRole, (req, res, next) => {
    aboutLogic.deleteAmenity(req.body.id, (err, result) => {
        if (err !== null) {
            next(err);
        }
        return res.status(200).json({ data: result });
    });
});

about.get("/amenties", (req, res, next) => {
    aboutLogic.getAmenity((err, results) => {
        if (err !== null) {
            next(err);
        }
        return res.status(200).json({ data: result });
    });
});

about.post("/amenties", isRole, (req, res, next) => {
    aboutLogic.postAmenity(req.body.data, (err, result) => {
        if (err !== null) {
            next(err);
        }
        return res.status(200).json({ data: result });
    });
});

about.put("/amenties", isRole, (req, res, next) => {
    aboutLogic.updateAmenity(req.body.id, req.body.data, (err, result) => {
        if (err !== null) {
            next(err);
        }
        return res.status(200).json({ data: result });
    });
});

module.exports = about;
