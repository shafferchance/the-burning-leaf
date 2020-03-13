const about = require("express").Router();

about.get('/about', (req, res, next) => {

});

about.patch('/about', (req, res, next) => {

});

// Omitting delete for now

about.get('/hours', (req, res, next) => {

});

about.patch('/about', (req, res, next) => {

});

// Omitting delete for now

about.get("/location", (req, res, next) => {

});

about.patch("/location", (req, res, next) => {

});

about.get("/amenties", (req, res, next) => {

});

about.post("/amenties_add", (req, res, next) => {

});

about.patch("/amenties_update", (req, res, next) => {

});

module.exports = about;