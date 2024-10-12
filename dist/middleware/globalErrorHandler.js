"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalErrorHandler = exports.globalErrorHandler = void 0;
const zod_1 = require("zod");
const handleZodError_1 = require("../errors/handleZodError");
const handleValidationError_1 = require("../errors/handleValidationError");
const handleCastError_1 = require("../errors/handleCastError");
const handledDuplicateError_1 = require("../errors/handledDuplicateError");
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = err.message || 'something went wrong';
    let errorSource = [
        {
            path: '',
            message: 'something went wrong'
        }
    ];
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.handleZodError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSource = simplifiedError.errorSource;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        const simplifiedError = (0, handleValidationError_1.handleValidationError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSource = simplifiedError.errorSource;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        const simplifiedError = (0, handleCastError_1.handleCastError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSource = simplifiedError.errorSource;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 11000) {
        const simplifiedError = (0, handledDuplicateError_1.handledDuplicateError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSource = simplifiedError.errorSource;
    }
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errorSource,
    });
};
exports.globalErrorHandler = globalErrorHandler;
exports.GlobalErrorHandler = {
    globalErrorHandler: exports.globalErrorHandler
};
