"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handledDuplicateError = void 0;
const handledDuplicateError = (err) => {
    const statusCode = 400;
    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];
    const errorSource = [
        {
            path: err.keyValue,
            message: `${extractedMessage} is already exist`,
        }
    ];
    return {
        statusCode,
        message: 'duplicate error',
        errorSource
    };
};
exports.handledDuplicateError = handledDuplicateError;
