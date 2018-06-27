"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var config = require("config");
exports.authCheck = function (req, res, next) {
    try {
        var token = req.headers.authorization.split(' ')[1];
        var decoded = jwt.verify(token, config.get('JWT_SECRET'));
        console.log("the decoded: ", decoded);
        req.userAuth = decoded;
        next();
    }
    catch (err) {
        res.status(403).json({
            error: 'Unauthorized request'
        });
    }
};
//# sourceMappingURL=middlewares.js.map