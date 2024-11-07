"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
const user_constant_1 = require("./user.constant");
const registerIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('payload', payload);
    const isUserExits = yield user_model_1.User.findOne({ email: payload.email });
    if (isUserExits) {
        throw new Error('User already exits');
    }
    const userData = {
        email: payload.email,
        password: payload.password,
        userName: payload.userName,
        profileImage: payload.profileImage,
        role: user_constant_1.USER_ROLE.USER
    };
    const result = yield user_model_1.User.create(userData);
    return result;
});
const getAllUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find();
    return result;
});
exports.UserServices = {
    registerIntoDB,
    getAllUserFromDB
};
