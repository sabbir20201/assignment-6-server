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
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const register = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    console.log('user register data');
    console.log(userData);
    const result = yield user_service_1.UserServices.registerIntoDB(userData);
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User create successfully',
        data: result
    });
}));
const adminRegister = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const result = yield user_service_1.UserServices.adminRegisterIntoDB(userData);
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User create successfully',
        data: result
    });
}));
const getAllUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserServices.getAllUserFromDB();
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'All User retrieve successfully',
        data: result
    });
}));
const getSingleUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const result = yield user_service_1.UserServices.getSingleUserFromDB(userId);
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Single User retrieve successfully',
        data: result
    });
}));
const follower = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const followingId = req.body.id; // jake follow kora hobe tar id 
    const followersId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
    // console.log('follow', followingId, followersId);
    const result = yield user_service_1.UserServices.followingInToDB(followingId, followersId);
    console.log('result from follow', result);
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'fOLLOWING SUCCESSFULLY',
        data: result
    });
}));
const unFollower = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const followingId = req.body.id; // jake follow kora hobe tar id 
    const followersId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
    console.log('un-follow', followingId, followersId);
    // 670b2cb2f04b1ac585a541fb   6720df573a5279cf66c3cc6c
    const result = yield user_service_1.UserServices.unFollowingInToDB(followingId, followersId);
    console.log('result from un-follow', result);
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'user un-follow success',
        data: result
    });
}));
const deleteUserControllerByAdmin = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    console.log('id from delete', id);
    const result = yield user_service_1.UserServices.deleteUserServicesById(id);
    res.json({
        success: true,
        statusCode: 200,
        message: "User deleted successfully by admin",
        data: result
    });
}));
exports.UserController = {
    register,
    getAllUser,
    getSingleUser,
    adminRegister,
    follower,
    unFollower,
    deleteUserControllerByAdmin
};
