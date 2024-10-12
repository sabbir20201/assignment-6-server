"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserModelSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: false,
    }
});
exports.User = (0, mongoose_1.model)('User', UserModelSchema);
