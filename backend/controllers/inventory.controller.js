const inv = require("express").Router();
const invLogic = require("../logic/invLogic");
const isRole = require("../middle/auth");

inv.get("/product", (req, res, next) => {
    invLogic.getProduct(req.body.id, (err, result) => {
        if (err !== null) { next(err); }
        return res.status(200)
                  .json({"data": result});
    });
});

inv.get("/products", (req, res, next) => {
    invLogic.getProducts((err, result) => {
        if (err !== null) { next(err); }
        return res.status(200)
                  .json({"data": result});
    });
});

inv.post("/products", isRole, (req, res, next) => {
    invLogic.insertProduct(req.body, (err, result) => {
        if (err !== null) { next(err); }
        return res.status(200)
                  .json({"data": result});
    });
});

inv.put("/products", isRole, (req, res, next) => {
    if (!req.session.authenticated) { next(err); }
    invLogic.updateProduct(req.body.id, req.body.data, (err, result) => {
        if (err !== null) { next(err); }
        return res.status(200)
                  .json({"data": result});
    });
});

inv.delete("/products", isRole, (req, res, next) => {
    if(!req.session.authenticated) { next(err); }
    invLogic.deleteProduct(req.body.id, (err, result) => {
        if (err !== null) { next(err); }
        return res.status(200)
                  .json({"data": result});
    });
});

// GET only since this will be a tag query!
inv.get("/products/popular", (req, res, next) => {
    invLogic.getPopular((err, result) => {
        if (err !== null) { next(err); }
        return res.status(200)
                  .json({"data": result});
    });
});

module.exports = inv;
