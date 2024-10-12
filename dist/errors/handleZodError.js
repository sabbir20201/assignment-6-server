"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
// import { TErrorSource, TGenericErrorResponse } from "../utils/errorType";
const handleZodError = (err) => {
    const statusCode = 400;
    const errorSource = err.issues.map((issue) => {
        return {
            path: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
            message: issue === null || issue === void 0 ? void 0 : issue.message
        };
    });
    return {
        statusCode,
        message: "Validation Error",
        errorSource,
    };
};
exports.handleZodError = handleZodError;
