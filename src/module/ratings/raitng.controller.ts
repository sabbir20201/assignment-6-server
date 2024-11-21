import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { ratingServices } from "./rating.service";

const addRatingController = catchAsync(async (req: Request, res: Response) => {
    const payload = req?.body;
    const recipeId = req?.params.id;
    const userId = (req as any)?.user._id;

    console.log('userId from rating 1', userId);

    const result = await ratingServices.addRatingIntoDB(payload, userId, recipeId)
    console.log('result from rating ', result);

    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'Rating added successfully',
        data: result
    });
});


const getAllRatingControllerById = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await ratingServices.getAllRatingByIdFromDB(id)


    res.json({
        success: true,
        statusCode: 200,
        message: "get all single recipe rating",
        data: result
    })
})
// const deleteComment = catchAsync(async (req: Request, res: Response) => {
//     const id = req.params.id as string;
//     const result = await commentServices.CommentDeletedFromDB(id)
//     res.json({
//         success: true,
//         statusCode: 200,
//         message: "Comment deleted",
//         data: result
//     })
// })
// const updateComment = catchAsync(async (req: Request, res: Response) => {
//     const id = req.params.id as string;
//     const updatedData = req.body;
//     const result = await commentServices.updateCommentFromDB(id, updatedData)
//     console.log('updated id  =>', id);
//     console.log('UPDATE data =>', updatedData);

//     res.json({
//         success: true,
//         statusCode: 200,
//         message: "comment updated successfully",
//         data: result
//     })
// })


export const RatingController = {
 addRatingController,
 getAllRatingControllerById
    // deleteComment,
    // updateComment
};

