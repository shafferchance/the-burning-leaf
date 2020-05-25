const usr = require('express').Router();
const usrLogic = require('../logic/usersLogic');
const isRole = require('../middle/auth');

usr.post("/sign-up", (req, res, next) => {
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

usr.post("/login", (req, res, next) => {
    console.log("called");
    usrLogic.login(req.body.user, req.body.pass)
            .then(same => {
                if (same === false) { 
                    return res.status(401)
                       .send({"message":"Incorrect password"});
                }
                return res.set('X-Auth-Header', same)
                          .status(200)
                          .send({"message":"success"})
            })
            .catch(err => res.status(500).send(err));

});

usr.get("/auth-test", isRole, (req, res, next) => {
    console.log("Protected accessed!");
    res.send("what?");
})

module.exports = usr;