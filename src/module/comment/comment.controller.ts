// import httpStatus from "http-status";
import { commentServices } from "./comment.service";
// import { catchAsync } from "../../utils/catchAsync";



// const addCommentController = catchAsync(async (req: Request, res:Response) => {
//     const commentData = req?.body;
//     const recipeId = req?.params.id;
//     const userId = req.params.id;
//     console.log(commentData, recipeId, userId);

//     const result = await commentServices.addCommentIntoDB(recipeId, userId, commentData)

//     res.status(httpStatus.OK).json({
//         success: true,
//         statusCode: httpStatus.OK,
//         message: 'get all recipe successfully',
//         data: result
//     })

// })




// export const RecipeController = {
//     addCommentController
// }
import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";

const addCommentController = catchAsync(async (req: Request, res: Response) => {
    const payload = req?.body;
    const recipeId = req?.params.id;
    const userId = req?.user._id;

    console.log('userId from comment 1', userId);
    

    const result = await commentServices.addCommentIntoDB(payload, userId, recipeId)
    console.log('result from comment ', result);

    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'Comment added successfully',
        data: result
    });
});


const getAllCommentById = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await commentServices.getAllCommentByIdFromDB(id)


    res.json({
        success: true,
        statusCode: 200,
        message: "get all single recipe comment",
        data: result
    })
})
const deleteComment = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await commentServices.CommentDeletedFromDB(id)
    res.json({
        success: true,
        statusCode: 200,
        message: "Comment deleted",
        data: result
    })
})
const updateComment = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const updatedData = req.body;
    const result = await commentServices.updateCommentFromDB(id, updatedData)
    console.log('updated id  =>', id);
    console.log('UPDATE data =>', updatedData);

    res.json({
        success: true,
        statusCode: 200,
        message: "comment updated successfully",
        data: result
    })
})
export const CommentController = { addCommentController, getAllCommentById, deleteComment, updateComment };

