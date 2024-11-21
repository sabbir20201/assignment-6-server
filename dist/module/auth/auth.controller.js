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
exports.AuthController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const auth_service_1 = require("./auth.service");
const catchAsync_1 = require("../../utils/catchAsync");
const login = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginData = req.body;
    const result = yield auth_service_1.AuthServices.userLoginFromDB(loginData);
    // console.log(result);
    const { refreshToken } = result;
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true
    });
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User login successfully',
        data: result
    });
}));
const changedPassword = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const passwordData = req === null || req === void 0 ? void 0 : req.body;
    const userId = req === null || req === void 0 ? void 0 : req.params.id;
    console.log('password from body', passwordData, 'user ', userId);
    const result = yield auth_service_1.AuthServices.changedPasswordFromDB(userId, passwordData);
    console.log(result);
    res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'password Updated successfully',
        data: result,
    });
}));
const updateUserInformation = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const userId = req === null || req === void 0 ? void 0 : req.user;
    console.log('user data from user update info', userId, userData);
    const result = yield auth_service_1.AuthServices.updateUserInformationFromDB(userId, userData);
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User updated successfully',
        data: result
    });
}));
// const forgetPassword = async (req: Request, res: Response) => {
//     const id = req.body;
//     const result = await AuthServices.forgetPasswordFromDB(id);
//     res.status(httpStatus.OK).json({
//         success: true,
//         statusCode: httpStatus.OK,
//         message: 'Reset Link generated successfully',
//         data: result
//     })
// }
exports.AuthController = {
    login,
    changedPassword,
    updateUserInformation,
    // forgetPassword
};
