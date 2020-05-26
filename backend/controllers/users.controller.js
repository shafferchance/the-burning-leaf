const usr = require('express').Router();
const usrLogic = require('../logic/usersLogic');
const isRole = require('../middle/auth');

usr.post("/sign-up", (req, res, next) => {
    usrLogic.signUp(req.body.user, req.body.pass, req.body.role, (err, result) => {
        if (err) {
            return res.status(500)
                      .json({err: `The following occured during sign up: ${err}`});
        }
        return res.status(200)
                  .set("Set-Cookie", `refresh_token=${result[0]}; Secure; HttpOnly`)
                  .json({
                      "message":"success",
                      "jwt_token": result[1],
                      "jwt_expire": 14 * 3600
                  });
    });
});

usr.post("/login", (req, res, next) => {
    console.log("called");
    usrLogic.login(req.body.user, req.body.pword)
            .then(same => {
                console.log(same);
                if (same[1] === false) { 
                    return res.status(401)
                              .json({
                                  "message":"Incorrect password"
                              })
                              .end();
                }
                return res.set('Set-Cookie', `refresh_token=${same[0]}; Secure; HttpOnly`)
                          .status(200)
                          .json({
                              "message":"success",
                              "jwt_token": same[1],
                              "jwt_expire": 14 * 3600
                          })
                          .end();
            })
            .catch(err => res.status(500).json({err: err}));

});

usr.get("/refresh_token", (req, res, next) => {
    usrLogic.verify_refresh(req.cookies["refresh_token"])
            .then(tokens => {
                return res.set('Set-Cookie', `refresh_token=${tokens[0]}; Secure; HttpOnly`)
                          .status(200)
                          .json({
                              "jwt_token": tokens[1],
                              "jwt_expire": 14 * 3600
                          })
                          .end();
            })
            .catch(err => res.status(500).json({err: err}));
});

usr.get("/auth-test", isRole, (req, res, next) => {
    console.log("Protected accessed!");
    res.send("what?");
});

module.exports = usr;