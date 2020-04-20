const about = require("express").Router();
const aboutLogic = require("../logic/aboutLogic");

about.get('/about', (req, res, next) => {
    aboutLogic.getAbout((err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.write(JSON.stringify({"data": result}));
        res.end();
        return res;
    });
});

about.patch('/about', (req, res, next) => {
    if (!req.session.authenticated) { next("Please Login"); }
    aboutLogic.updateAbout(req.body.data, (err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.write(JSON.stringify({"data": result}));
        res.end();
        return res;
    });
});

// Omitting delete for now

about.get('/hours', (req, res, next) => {
    aboutLogic.getHours((err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.write(JSON.stringify({"data": result}));
        res.end();
        return res;
    });
});

about.patch('/hours', (req, res, next) => {
    if (!req.session.authenticated) { next("Please Login"); }
    aboutLogic.updateAbout(req.body.data, (err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.write(JSON.stringify({"data": result}));
        res.end();
        return res;
    });
});

// Omitting delete for now

about.get("/location", (req, res, next) => {
    aboutLogic.getLocation((err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.write(JSON.stringify({"data": result}));
        res.end();
        return res;
    });
});

about.put("/location", (req, res, next) => {
    if (!req.session.authenticated) { next("Please Login"); }
    aboutLogic.updateLocation(req.body.data, (err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.write(JSON.stringify({"data": result}));
        res.end();
        return res;
    });
});

about.delete("/amenties", (req, res, next) => {
    if (!req.session.authenticated) { next("Please Login"); }
    aboutLogic.deleteAmenity(req.body.id, (err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.write(JSON.stringify({"data": result}));
        res.end();
        return res;
    });
});

about.get("/amenties", (req, res, next) => {
    aboutLogic.getAmenity((err, results) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.write(JSON.stringify({"data": result}));
        res.end();
        return res;
    });
});

about.post("/amenties", (req, res, next) => {
    if (!req.session.authenticated) { next("Please Login"); }
    aboutLogic.postAmenity(req.body.data, (err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.write(JSON.stringify({"data": result}));
        res.end();
        return res;
    });
});

about.put("/amenties", (req, res, next) => {
    if (!req.session.authenticated) { next("Please Login"); }
    aboutLogic.updateAmenity(req.body.id, req.body.data, (err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.write(JSON.stringify({"data": result}));
        res.end();
        return res;
    });
});

module.exports = about;