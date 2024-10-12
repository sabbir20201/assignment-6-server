import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from "http-status";
import { RecipeServices } from "./recipe.service";


const createRecipe = catchAsync(async (req: Request, res: Response) => {
    const recipeData = req.body;
    const result = await RecipeServices.createRecipeIntoDB(recipeData)
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

export const RecipeController = {
    createRecipe,
    getAllRecipe
}