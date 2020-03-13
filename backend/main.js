const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.resolve('..','frontend','public')));

app.listen(8000, () => console.log("Listening on port 8000"));