const inv = require("express").Router();
const invLogic = require("../logic/invLogic");

inv.get("/product", (req, res, next) => {
    invLogic.getProduct(req.body.id, (err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.write(JSON.stringify({"data": result}));
        res.end();
        return res;
    });
});

inv.get("/products", (req, res, next) => {
    invLogic.getProducts((err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.write(JSON.stringify({"data": result}));
        res.end();
        return res;
    });
});

inv.post("/products", (req, res, next) => {
    if (!req.session.authenticated) { next(err); }
    invLogic.insertProduct(req.body.data, (err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.write(JSON.stringify({"data": result}));
        res.end();
        return res;
    });
});

inv.put("/products", (req, res, next) => {
    if (!req.session.authenticated) { next(err); }
    invLogic.updateProduct(req.body.id, req.body.data, (err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.write(JSON.stringify({"data": result}));
        res.end();
        return res;
    });
});

inv.delete("/products", (req, res, next) => {
    if(!req.session.authenticated) { next(err); }
    invLogic.deleteProduct(req.body.id, (err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.write(JSON.stringify({"data": result}));
        res.end();
        return res;
    });
});

// GET only since this will be a tag query!
inv.get("/products/popular", (req, res, next) => {
    invLogic.getPopular((err, result) => {
        if (err !== null) { next(err); }
        res.statusCode = 200;
        res.write(JSON.stringify({"data": result}));
        res.end();
        return res;
    });
});

module.exports = inv;
