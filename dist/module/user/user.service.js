"use strict";
"use client";
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
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
const user_constant_1 = require("./user.constant");
const createToken_1 = require("../../utils/createToken");
const config_1 = __importDefault(require("../../config"));
var jwt = require('jsonwebtoken');
const registerIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('payload', payload);
    const isUserExits = yield user_model_1.User.findOne({ email: payload.email });
    if (isUserExits) {
        throw new Error('User already exits');
    }
    const jwtPayloadData = {
        email: payload.email,
        password: payload.password,
        userName: payload.userName,
        profileImage: payload.profileImage,
        role: user_constant_1.USER_ROLE.ADMIN
    };
    const accessToken = (0, createToken_1.createToken)(jwtPayloadData, config_1.default.jwt_access_secret, config_1.default.jwt_access_expire_in);
    const refreshToken = jwt.sign(jwtPayloadData, config_1.default.jwt_refresh_secret, { expiresIn: config_1.default.jwt_refresh_expire_in });
    yield user_model_1.User.create(jwtPayloadData);
    return {
        accessToken,
        refreshToken
    };
});
const adminRegisterIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('payload', payload);
    const isUserExits = yield user_model_1.User.findOne({ email: payload.email });
    if (isUserExits) {
        throw new Error('User already exits');
    }
    const jwtPayloadData = {
        email: payload.email,
        password: payload.password,
        userName: payload.userName,
        profileImage: payload.profileImage,
        role: user_constant_1.USER_ROLE.ADMIN
    };
    const accessToken = (0, createToken_1.createToken)(jwtPayloadData, config_1.default.jwt_access_secret, config_1.default.jwt_access_expire_in);
    const refreshToken = jwt.sign(jwtPayloadData, config_1.default.jwt_refresh_secret, { expiresIn: config_1.default.jwt_refresh_expire_in });
    yield user_model_1.User.create(jwtPayloadData);
    return {
        accessToken,
        refreshToken
    };
});
const getAllUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find();
    return result;
});
const getSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ _id: userId });
    return result;
});
const followingInToDB = (followingId, followersId) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedFollowerUser = yield user_model_1.User.findByIdAndUpdate(followingId, { $addToSet: { followers: followersId } }, { new: true });
    const updatedFollowingUser = yield user_model_1.User.findByIdAndUpdate(followersId, { $addToSet: { following: followingId } }, { new: true });
    return {
        updatedFollowingUser,
        updatedFollowerUser
    };
});
const unFollowingInToDB = (followingId, followersId) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUnFollowerUser = yield user_model_1.User.findByIdAndUpdate(followingId, { $pull: { followers: followersId } }, { new: true });
    const updatedUnFollowingUser = yield user_model_1.User.findByIdAndUpdate(followersId, { $pull: { following: followingId } }, { new: true });
    return {
        updatedUnFollowerUser,
        updatedUnFollowingUser
    };
});
const deleteUserServicesById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_model_1.User.deleteOne({ _id: id });
        console.log('result from service', result);
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
exports.UserServices = {
    registerIntoDB,
    getAllUserFromDB,
    getSingleUserFromDB,
    followingInToDB,
    unFollowingInToDB,
    adminRegisterIntoDB,
    deleteUserServicesById
};
