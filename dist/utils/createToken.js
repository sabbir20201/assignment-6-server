"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
var jwt = require('jsonwebtoken');
const createToken = (payload, secret, expireTime) => {
    return jwt.sign(payload, secret, {
        expiresIn: expireTime
    });
};
exports.createToken = createToken;
