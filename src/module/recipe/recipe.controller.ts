import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from "http-status";
import { RecipeServices } from "./recipe.service";

const createRecipe = catchAsync(async (req: Request, res: Response) => {
    const recipeData = req.body;
    const userEmail = (req as any).user?.email;
    // console.log('useremaul', userEmail);

    const result = await RecipeServices.createRecipeIntoDB(recipeData, userEmail)
    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'User create successfully',
        data: result
    })

})
const getAllRecipe = catchAsync(async (req: Request, res: Response) => {
    const result = await RecipeServices.getAllRecipeIntoDB()
    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'get all recipe successfully',
        data: result
    })
})
const findRecipeById = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await RecipeServices.findRecipeByIdFromDB(id)
    res.json({
        success: true,
        statusCode: 200,
        message: "Single recipe getting successfully",
        data: result
    })
})
const findRecipeByUserId = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    console.log('user id single recipe', id);
    const result = await RecipeServices.findRecipeByUserIdFromDB(id)

    res.json({
        success: true,
        statusCode: 200,
        message: "Single user's recipes retrieve successfully",
        data: result
    })
})
// const ratingRecipeController = catchAsync(async (req: Request, res: Response) => {

//     const { recipeId, rating } = req.body;
//     const userId = req?.user._id;

//     const result = await RecipeServices.ratingRecipe(recipeId, userId, rating)
//     res.json({
//         success: true,
//         statusCode: 200,
//         message: "rate recipe got successfully",
//         data: result
//     })})


// const voteRecipeController = catchAsync(async (req: Request, res: Response) => {

//     const { recipeId, voteType } = req.body;
//     const userId = req?.user._id;

//     const result = await RecipeServices.voteRecipeInToDB(recipeId, userId, comment)
//     res.json({
//         success: true,
//         statusCode: 200,
//         message: "comment added successfully",
//         data: result
//     })})


// delete a recepi 
const deleteRecipeController = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    console.log('id from delete', id);
    
    const result = await RecipeServices.deleteRecipeServices(id)
    res.json({
        success: true,
        statusCode: 200,
        message: "Recipe deleted successfully",
        data: result
    })
})
const deleteRecipeControllerByAdmin = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    console.log('id from delete', id);
    
    const result = await RecipeServices.deleteRecipeServices(id)
    res.json({
        success: true,
        statusCode: 200,
        message: "Recipe deleted successfully by admin",
        data: result
    })
})

// update 
// const updateRecipeControllerById = catchAsync(async (req: Request, res: Response) => {
//     const id = req.params.id as string;
//     const updatedData = req.body;
//     const result = await RecipeServices.updateRecipeServicesById(id, updatedData)
//     console.log('updated id  =>', id);
//     console.log('UPDATE data =>', updatedData);

//     res.json({
//         success: true,
//         statusCode: 200,
//         message: "comment updated successfully",
//         data: result
//     })
// })

export const RecipeController = {
    createRecipe,
    getAllRecipe,
    findRecipeById,
    deleteRecipeController,
    findRecipeByUserId,
    deleteRecipeControllerByAdmin
    // updateRecipeControllerById
}