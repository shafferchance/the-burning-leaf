import * as argon2 from 'argon2';
import dotenv from 'dotenv';
import { randomBytes } from 'crypto';

import db from './logic/database-login';
import crud from './logic/database-crud';

dotenv.config();
db.connect();

let [usr, pass] = process.argv.slice(2);

const salt = randomBytes(32);
argon2.hash(pass, { salt })
      .then(hash => crud.mongoInsert("users", {"user": usr, "pass": hash, "role": "admin"}))
      .then(res => db.genJWT(res.insertedId, "admin"))
      .catch(err => console.error(err))
