const about = require("express").Router();
const aboutLogic = require("../logic/aboutLogic");

about.get('/about', (req, res, next) => {
    aboutLogic.getAbout((err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.append("data", JSON.stringify(result));
        res.end();
    });
});

about.patch('/about', (req, res, next) => {
    if (!req.session.user) { next("Please Login"); }
    aboutLogic.updateAbout(req.body.data, (err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.append("data", JSON.stringify(result));
        res.end();
    });
});

// Omitting delete for now

about.get('/hours', (req, res, next) => {
    aboutLogic.getHours((err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.append("data", JSON.stringify(result));
        res.end();
    });
});

about.patch('/hours', (req, res, next) => {
    if (!req.session.user) { next("Please Login"); }
    aboutLogic.updateAbout(req.body.data, (err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.append("data", JSON.stringify(result));
        res.end();
    });
});

// Omitting delete for now

about.get("/location", (req, res, next) => {
    aboutLogic.getLocation((err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.append("data", JSON.stringify(result));
        res.end();
    });
});

about.put("/location", (req, res, next) => {
    if (!req.session.user) { next("Please Login"); }
    aboutLogic.updateLocation(req.body.data, (err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.append("data", JSON.stringify(result));
        res.end();
    });
});

about.delete("/amenties", (req, res, next) => {
    if (!req.session.user) { next("Please Login"); }
    aboutLogic.deleteAmenity(req.body.id, (err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.append("data", JSON.stringify(result));
        res.end();
    });
});

about.get("/amenties", (req, res, next) => {
    aboutLogic.getAmenity((err, results) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.append("data", JSON.stringify(result));
        res.end();
    });
});

about.post("/amenties", (req, res, next) => {
    if (!req.session.user) { next("Please Login"); }
    aboutLogic.postAmenity(req.body.data, (err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.append("data", JSON.stringify(result));
        res.end();
    });
});

about.put("/amenties", (req, res, next) => {
    if (!req.session.user) { next("Please Login"); }
    aboutLogic.updateAmenity(req.body.id, req.body.data, (err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.append("data", JSON.stringify(result));
        res.end();
    });
});

module.exports = about;