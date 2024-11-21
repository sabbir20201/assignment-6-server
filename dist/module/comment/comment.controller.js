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
exports.CommentController = void 0;
// import httpStatus from "http-status";
const comment_service_1 = require("./comment.service");
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const addCommentController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req === null || req === void 0 ? void 0 : req.body;
    const recipeId = req === null || req === void 0 ? void 0 : req.params.id;
    const userId = req === null || req === void 0 ? void 0 : req.user._id;
    console.log('userId from comment 1', userId);
    const result = yield comment_service_1.commentServices.addCommentIntoDB(payload, userId, recipeId);
    console.log('result from comment ', result);
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Comment added successfully',
        data: result
    });
}));
const getAllCommentById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield comment_service_1.commentServices.getAllCommentByIdFromDB(id);
    res.json({
        success: true,
        statusCode: 200,
        message: "get all single recipe comment",
        data: result
    });
}));
const deleteComment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield comment_service_1.commentServices.CommentDeletedFromDB(id);
    res.json({
        success: true,
        statusCode: 200,
        message: "Comment deleted",
        data: result
    });
}));
const updateComment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield comment_service_1.commentServices.updateCommentFromDB(id, updatedData);
    console.log('updated id  =>', id);
    console.log('UPDATE data =>', updatedData);
    res.json({
        success: true,
        statusCode: 200,
        message: "comment updated successfully",
        data: result
    });
}));
exports.CommentController = { addCommentController, getAllCommentById, deleteComment, updateComment };
