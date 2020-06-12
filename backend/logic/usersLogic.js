const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const process = require('process');
const { randomBytes } = require('crypto');
const { ObjectID, ResumeToken } = require('mongodb');

const { genJWT, genJWTRefresh } = require('./database-login');
const dbCRUD = require('./database-crud');

function signUp (usr, pass, role = "customer", cb = undefined) {
    if (cb === undefined) throw TypeError("Callback expected");
    const salt = randomBytes(32);
    argon2.hash(pass, { salt })
          .then(hash => dbCRUD.mongoInsert(
                            "users", 
                            {
                                "users": usr, 
                                "pass": hash, 
                                "role": role,
                                "refresh": []
                            }))
          .then(res => Promise.all([genJWTRefresh(res.insertedId, role), genJWT(res.insertedId, role)]))
          .then(tokens => cb(null, tokens))
          .catch(err => cb(err, null));
}

function login (usr, pass) {
    console.log("Chcking pword...")
    return dbCRUD.mongoGETOne("users", {"user": usr})
          .then(result => {
              if (result === null) { throw new Error("invalidUser")}
              console.log(result, pass);
              return Promise.all([argon2.verify(result.pass, pass), Promise.resolve(result)])
          })
          .then(same => {
              console.log(same[1]._id)
              if (!same[0]) {
                  return false;
              }
              return Promise.all([genJWTRefresh(same[1]._id), genJWT(same[1]._id, same[1].role || "user")]);
          })
}

function verify_refresh (token) {
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        return Promise.all([genJWTRefresh(decoded.id, decoded.role), genJWT(decoded.id, decoded.role)]);
    } catch (e) {
        res.status(401).send(`Invalid token: ${e}`);
    }
}

// function refreshChk (id) {
//     let [token,uuid] = genJWTRefresh();
//     const check = {uuid: uuid, token: token}
//     if (dbCRUD.refresh.length > 5) {
//         dbCRUD.mongoUPDATE(
//             "users", 
//             {_id: new ObjectID(id)},
//             {$set: {
//                 "refresh": [check]
//             }}
//         );
//     } else {
//         dbCRUD.mongoUPDATE(
//             "users",
//             {_id: new ObjectID(id)},
//             {$push: {
//                 "refresh": check
//             }}
//         );
//     }
//     return token;
// }

module.exports = {
    login,
    signUp,
    verify_refresh
}