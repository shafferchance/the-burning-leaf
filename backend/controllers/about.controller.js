const about = require("express").Router();

about.get('/about', (req, res, next) => {

});

about.patch('/about', (req, res, next) => {

});

// Omitting delete for now

about.get('/hours', (req, res, next) => {

});

about.patch('/hours', (req, res, next) => {

});

// Omitting delete for now

about.get("/location", (req, res, next) => {

});

about.patch("/location", (req, res, next) => {

});

about.get("/amenties", (req, res, next) => {

});

about.post("/amenties", (req, res, next) => {

});

about.patch("/amenties", (req, res, next) => {

});

module.exports = about;