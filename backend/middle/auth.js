const jwt = require("jsonwebtoken");

const role = {
    "admin": [
        {[/\/.+/]: ["GET","POST","DELETE"]}
    ],
    "customer": [
        {[/api\/v1\/general\/.+/]: ["GET"]}
    ]
}

function isRole (req, res, next) {
    const header = req.headers["authorization"];
    if (!header) return res.status(403).send("Access Denied: No Token Found!");
    const [_,token] = header.split(' ');
    try {
        let perms = [];
        const decoded = jwt.verify(token, process.env.SECRET);
        console.log(decoded.role);
        for (const key of role[decoded.role]) {
            const [regEx, verbs] = Object.entries(key)[0];
            const match = req.baseUrl.match(new RegExp(regEx));
            if (key === req.baseUrl && match) {
                perms = verbs;
                break;
            } else if (match) {
                perms = verbs;
            }
        }
        if (perms.indexOf(req.method.toUpperCase())) {
            req.user = decoded;
            next();
        } else {
            return res.status(401).send('Access Denied: You do not have permission to do this')
        }
    } catch (ex) {
        res.status(401).send(`Invalid token: ${ex}`);
    }
}

module.exports = isRole;