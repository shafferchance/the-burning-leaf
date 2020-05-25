const argon2 = require('argon2');
const dotenv = require('dotenv');
const { randomBytes } = require('crypto');

const db = require('./logic/database-login');
const crud = require('./logic/database-crud');
dotenv.config();
db.connect(() => {
      let [usr, pass] = process.argv.slice(2);

      const salt = randomBytes(32);
      argon2.hash(pass, { salt })
            .then(hash => crud.mongoInsert("users", {"user": usr, "pass": hash, "role": "admin"}))
            .then(res => db.genJWT(res.insertedId, "admin"))
            .then(key => {
                  console.log(key); 
                  db.close();
            })
            .catch(err => console.error(err))
      
});
