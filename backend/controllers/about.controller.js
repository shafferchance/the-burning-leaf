const about = require("express").Router();
const aboutLogic = require("../logic/aboutLogic");

about.get('/', (req, res, next) => {
    aboutLogic.getAbout((err, result) => {
        if (err !== null) { next(err); }
        return res.status(200)
                  .json({"data": result});
    });
});

about.patch('/', (req, res, next) => {
    if (!req.session.authenticated) { next("Please Login"); }
    aboutLogic.updateAbout(req.body.data, (err, result) => {
        if (err !== null) { next(err); }
        return res.status(200)
                  .json({"data": result});
    });
});

// Omitting delete for now

about.get('/hours', (req, res, next) => {
    aboutLogic.getHours((err, result) => {
        if (err !== null) { next(err); }
        return res.status(200)
                  .json({"data": result});
    });
});

about.patch('/hours', (req, res, next) => {
    if (!req.session.authenticated) { next("Please Login"); }
    aboutLogic.updateAbout(req.body.data, (err, result) => {
        if (err !== null) { next(err); }
        return res.status(200)
                  .json({"data": result});
    });
});

// Omitting delete for now

about.get("/location", (req, res, next) => {
    aboutLogic.getLocation((err, result) => {
        if (err !== null) { next(err); }
        return res.status(200)
                  .json({"data": result});
    });
});

about.put("/location", (req, res, next) => {
    if (!req.session.authenticated) { next("Please Login"); }
    aboutLogic.updateLocation(req.body.data, (err, result) => {
        if (err !== null) { next(err); }
        return res.status(200)
                  .json({"data": result});
    });
});

about.delete("/amenties", (req, res, next) => {
    if (!req.session.authenticated) { next("Please Login"); }
    aboutLogic.deleteAmenity(req.body.id, (err, result) => {
        if (err !== null) { next(err); }
        return res.status(200)
                  .json({"data": result});
    });
});

about.get("/amenties", (req, res, next) => {
    aboutLogic.getAmenity((err, results) => {
        if (err !== null) { next(err); }
        return res.status(200)
                  .json({"data": result});
    });
});

about.post("/amenties", (req, res, next) => {
    if (!req.session.authenticated) { next("Please Login"); }
    aboutLogic.postAmenity(req.body.data, (err, result) => {
        if (err !== null) { next(err); }
        return res.status(200)
                  .json({"data": result});
    });
});

about.put("/amenties", (req, res, next) => {
    if (!req.session.authenticated) { next("Please Login"); }
    aboutLogic.updateAmenity(req.body.id, req.body.data, (err, result) => {
        if (err !== null) { next(err); }
        return res.status(200)
                  .json({"data": result});
    });
});

module.exports = about;