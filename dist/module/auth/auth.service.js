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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
var jwt = require('jsonwebtoken');
const userLoginFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exitsUser = yield user_model_1.User.findOne({ email: payload.email });
    if (!exitsUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not exits');
    }
    const passwordMatch = yield (0, isPasswordMatched_1.isPasswordMatched)(payload.password, exitsUser.password);
    // console.log('Attempting to login:', payload);
    // console.log('Found user:', exitsUser);
    if (!passwordMatch) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Password dose not matched');
    }
    const userId = exitsUser._id.toString();
    console.log(exitsUser);
    const jwtPayload = {
        _id: userId,
        email: exitsUser.email,
        role: exitsUser.role,
        userName: exitsUser.userName,
        profileImage: exitsUser.profileImage,
        followers: exitsUser === null || exitsUser === void 0 ? void 0 : exitsUser.followers,
        following: exitsUser === null || exitsUser === void 0 ? void 0 : exitsUser.following,
    };
    console.log('from jwt payload', jwtPayload);
    const accessToken = (0, createToken_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expire_in);
    const refreshToken = jwt.sign(jwtPayload, config_1.default.jwt_refresh_secret, { expiresIn: config_1.default.jwt_refresh_expire_in });
    return {
        accessToken,
        refreshToken
    };
});
const changedPasswordFromDB = ((userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.findOne({ _id: userId });
        if (!user) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'this is user is not found');
        }
        const matchedPassword = yield (0, isPasswordMatched_1.isPasswordMatched)(payload === null || payload === void 0 ? void 0 : payload.oldPassword, user === null || user === void 0 ? void 0 : user.password);
        if (!matchedPassword) {
            console.log('password dose not matched');
        }
        // hashNew password 
        const newHashedPassword = yield bcryptjs_1.default.hash(payload.newPassword, Number(config_1.default.salt_round));
        yield user_model_1.User.findByIdAndUpdate(user._id, {
            password: newHashedPassword,
            passwordChangedAt: new Date(),
        }, { new: true });
        return null;
    }
    catch (error) {
        console.log(error);
    }
}));
// const refreshToken = async (token: string) => {
//     const decoded = jwt.verify(
//         token,
//         config.jwt_refresh_secret
//     )
//     const { email, int } = decoded;
//     // check if the user is exist 
//     const user = await User.findOne({email: email});
//     if (!user) {
//         throw new AppError(httpStatus.NOT_FOUND, 'this user is not found')
//     }
//     // check the user is blocked 
//     // if (userStatus === 'BLOCKED') {
//     //     throw new AppError(httpStatus.FORBIDDEN, 'this user is blocked');
//     // }
//     if (user.passwordChangedAt && User.isJWTIssueBeforePasswordChange(user.passwordChangedAt)) {
//         throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorized')
//     }
//     const jwtPayload = {
//         _id: user._id,
//         // name: user.name,
//         email: user.email,
//         // mobileNumber: user.mobileNumber,
//         role: user.role,
//         // status: user.status,
//     };
//     const accessToken = createToken(
//         jwtPayload,
//         config.jwt_access_secret as string,
//         config.jwt_access_expire_in as string,
//     );
//     return {
//         accessToken,
//     };
// }
const updateUserInformationFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('from user updated service id', id);
        const updateComment = yield user_model_1.User.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true
        });
        return updateComment;
    }
    catch (error) {
        console.log(error);
    }
});
// const forgetPasswordFromDB = async (id: string) => {
//     const exitsUser = await User.findOne({ email: payload.email });
//     if (!exitsUser) {
//         throw new AppError(httpStatus.NOT_FOUND, 'User not exits')
//     }
//     const userId = exitsUser._id.toString();
//     const jwtPayload = {
//         _id: userId,
//         email: exitsUser.email,
//         role: exitsUser.role,
//     }
//     console.log('from jwt payload', jwtPayload);
//     const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expire_in as string)
//     const resetUiLink = `http://localhost:3000?id=${id}token=${accessToken}`
//     sendEmail()
// }
exports.AuthServices = {
    userLoginFromDB,
    changedPasswordFromDB,
    updateUserInformationFromDB,
    // forgetPasswordFromDB
};
