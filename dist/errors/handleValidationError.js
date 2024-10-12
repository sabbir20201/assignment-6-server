"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
const handleValidationError = (err) => {
    const statusCode = 400;
    const errorSource = Object.values(err.errors).map((value) => {
        return {
            path: value === null || value === void 0 ? void 0 : value.path,
            message: value === null || value === void 0 ? void 0 : value.message,
        };
    });
    return {
        statusCode,
        message: 'mongoose validation error',
        errorSource
    };
};
exports.handleValidationError = handleValidationError;
