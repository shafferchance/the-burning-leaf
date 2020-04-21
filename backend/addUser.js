const bcrypt = require('bcrypt');
const dotenv = require("dotenv");

const db = require('./logic/database-login');
const crud = require('./logic/database-crud');
const SALT = 15;
dotenv.config();
db.connect();

let [usr, pass] = process.argv.slice(2);

bcrypt.genSalt(SALT, function(err, salt) {
    if (err) throw err;
    bcrypt.hash(pass, salt, function (err, hash) {
        if (err) throw err;
        crud.mongoInsert("users", {"user": usr, "pass": hash})
            .then(res => {console.log(res); db.close()})
            .catch(err => console.error(err));
    })
});


