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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const isPasswordMatched_1 = require("../../utils/isPasswordMatched");
const createToken_1 = require("../../utils/createToken");
const config_1 = __importDefault(require("../../config"));
var jwt = require('jsonwebtoken');
const userLoginFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exitsUser = yield user_model_1.User.findOne({ email: payload.email });
    if (!exitsUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not exits');
    }
    const passwordMatch = yield (0, isPasswordMatched_1.isPasswordMatched)(payload.password, exitsUser.password);
    console.log('Attempting to login:', payload);
    console.log('Found user:', exitsUser);
    if (!passwordMatch) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Password dose not matched');
    }
    const jwtPayload = {
        email: exitsUser.email,
        role: exitsUser.role
    };
    const accessToken = (0, createToken_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expire_in);
    const refreshToken = jwt.sign(jwtPayload, config_1.default.jwt_refresh_secret, { expiresIn: config_1.default.jwt_refresh_expire_in });
    return {
        accessToken,
        refreshToken
    };
});
exports.AuthServices = {
    userLoginFromDB
};
