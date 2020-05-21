const usr = require('express').Router();
const usrLogic = require('../logic/usersLogic');

usr.get("/sign-up", (req, res, next) => {
    usrLogic.signUp(req.body.user, req.body.pass, req.body.role, (err, result) => {
        if (err) {
            res.status(500);
            res.write(`The following occured during sign up: ${err}`);
            res.end();
            return;
        }
        res.header("X-Auth-Header", result).send(req.body.user);
        res.status(200);
        res.end();
    });
});

usr.get("/login", (req, res, next) => {
    usrLogic.login(req.body.user, req.body.pass, (err, result) => {
        if (err) {
            res.status(500);
            res.write(`The following occured during login: ${err}`);
            res.end();
            return;
        }
        res.header("X-Auth-Header", result).send(req.body.user);
        res.status(200);
        res.end();
    })
});

module.exports = usr;