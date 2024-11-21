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
exports.commentServices = void 0;
const comment_model_1 = require("./comment.model");
const addCommentIntoDB = (payload, userId, recipeId) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeData = Object.assign(Object.assign({}, payload), { user: userId, recipeId: recipeId });
    console.log('recipeData', recipeData);
    const result = yield comment_model_1.Comment.create(recipeData);
    return result;
});
const getAllCommentByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield comment_model_1.Comment.find({ recipeId: id }).populate({
            path: 'comment'
        })
            .populate({
            path: 'user',
            select: 'userName email followers following'
        });
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
const CommentDeletedFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('from service id', id);
        const result = yield comment_model_1.Comment.deleteOne({ _id: id });
        console.log('result from service', result);
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
const updateCommentFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('from service id', id);
        const updateComment = yield comment_model_1.Comment.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true
        });
        return updateComment;
    }
    catch (error) {
        console.log(error);
    }
});
exports.commentServices = {
    addCommentIntoDB,
    getAllCommentByIdFromDB,
    CommentDeletedFromDB,
    updateCommentFromDB
};
