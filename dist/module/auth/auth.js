"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const auth = (allowedRoles) => {
    return (req, res, next) => {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            res.status(401).json({
                success: false,
                statusCode: 401,
                message: "you have no access to this route"
            });
            return;
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
            if (!allowedRoles.includes(decoded.role)) {
                res.status(401).json({
                    success: false,
                    statusCode: 403,
                    message: "you have no access this route"
                });
                return;
            }
            req.user = decoded;
            next();
        }
        catch (error) {
            res.status(401).json({
                success: false,
                statusCode: 401,
                message: "invalid token authentication failed"
            });
            return;
        }
    };
};
exports.auth = auth;
