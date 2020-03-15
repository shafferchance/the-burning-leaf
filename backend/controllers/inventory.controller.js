const inv = require("express").Router();

inv.get("/products", (req, res, next) => {

});

inv.post("/products", (req, res, next) => {

});

inv.patch("/products", (req, res, next) => {

});

inv.delete("/products", (req, res, next) => {

});

// GET only since this will be a tag query!
inv.get("/products/popular", (req, res, next) => {

});

module.exports = inv;
