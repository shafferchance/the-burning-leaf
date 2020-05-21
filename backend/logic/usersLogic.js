const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const randomBytes = require('crypto').randomBytes;
const genJWT = require('./database-login').genJWT
const dbCRUD = require('./database-crud');

function signUp (usr, pass, role = "customer", cb = undefined) {
    if (cb === undefined) throw TypeError("Callback expected");
    const salt = randomBytes(32);
    argon2.hash(pass, { salt })
          .then(hash => dbCRUD.mongoInsert("users", {"users": usr, "pass": hash, "role": role}))
          .then(res => genJWT(res.insertedId, role))
          .then(token => cb(null, token))
          .catch(err => cb(err, null));
}

function login (usr, pass, cb) {
    dbCRUD.mongoGETOne("users", {"user": usr})
          .then(result => argon2.verify(result.pass, pass))
          .then(same => {
              if (!same) cb("Incorrect password", null);
              cb(null, same);
          })
          .catch(err => cb(err, null));
}

module.exports = {
    login,
    signUp
}