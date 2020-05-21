const jwt = require("jsonwebtoken");

const role = {
    "admin": {
        [/\/.+/]: ["GET"]
    },
    "customer": {
        [/^((?!dashboard\.html).)*$/]: ["GET"]
    }
}

function role (req, res, next) {
    const token = req.header("X-Auth-Header");
    if (!token) return res.status(401).send("Access Denied: No Token Found!");
    try {
        let perms = [];
        const decoded = jwt.verify(token, process.env.SECRET);
        for (const key in role[decoded.role]) {
            const match = req.baseUrl.match(new RegExp(key));
            if (key === req.baseUrl && match) {
                perms = role[decoded.role][key];
                break;
            } else if (match) {
                perms = role[decoded.role][key];
            }
        }
        if (perms.indexOf(req.method.toUpperCase())) {
            req.user = decoded;
            next();
        } else {
            return res.status(401).send('Access Denied: You do not have permission to do this')
        }
    } catch (ex) {
        res.status(401).send("Invalid token");
    }
}

module.exports = role;