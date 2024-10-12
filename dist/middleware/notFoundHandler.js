"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
const http_status_1 = __importDefault(require("http-status"));
const statusCode = http_status_1.default.NOT_FOUND;
const notFoundHandler = (req, res, next) => {
    res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message: "Api not found"
    });
};
exports.notFoundHandler = notFoundHandler;
