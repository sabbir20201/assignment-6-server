
import mongoose from "mongoose";
import { TComment } from "./comment.interface";
import { Comment } from "./comment.model";



const addCommentIntoDB = async (payload: TComment,userId: string, recipeId: string) => {
    const recipeData = {
        ...payload,
        user: userId,
        recipeId:recipeId
    }

    console.log('recipeData', recipeData);

    const result = await Comment.create(recipeData)
    return result
}

const getAllCommentByIdFromDB = async (id: string) => {
    try {
        const result = await Comment.find({recipeId: id}).populate({
            path: 'comment'
        })
        .populate({
           path: 'user',
            select: 'userName email followers following'
        })
        return result
    } catch (error) {
        console.log(error);
    }
}
const CommentDeletedFromDB = async (id: string) => {
    try {
        console.log('from service id',id);
        
        const result = await Comment.deleteOne({_id: id})
        console.log('result from service', result);
        
        return result
    } catch (error) {
        console.log(error);
    }
}
const updateCommentFromDB = async (id: string,payload:TComment) => {
    try {
        console.log('from service id',id);
        const updateComment = await Comment.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true
        })
        return updateComment
    } catch (error) {
        console.log(error);
    }
}


export const commentServices = {
    addCommentIntoDB,
    getAllCommentByIdFromDB,
    CommentDeletedFromDB,
    updateCommentFromDB
}