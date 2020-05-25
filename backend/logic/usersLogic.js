const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { genJWT } = require('./database-login');
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

function login (usr, pass) {
    console.log("Chcking pword...")
    return dbCRUD.mongoGETOne("users", {"user": usr})
          .then(result => Promise.all([argon2.verify(result.pass, pass), Promise.resolve(result)]))
          .then(same => {
              console.log(same[0])
              if (!same[0]) {
                  return false;
              }
              return genJWT(same[1].id)
          })
          .catch(err => err);
}

module.exports = {
    login,
    signUp
}