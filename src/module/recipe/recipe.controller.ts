import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from "http-status";
import { RecipeServices } from "./recipe.service";
import { User } from "../user/user.model";


const createRecipe = catchAsync(async (req: Request, res: Response) => {
    const recipeData = req.body;
    const userEmail = (req as any).user?.email;
    console.log('useremaul', userEmail);
    
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
const findARecipeById = catchAsync(async (req: Request, res: Response) => {

    const id = req.params.id as string;
    console.log('RECIPE ID=>', id);
    const result = await RecipeServices.findARecipeByIdFromDB(id)
    res.json({
        success: true,
        statusCode: 200,
        message: "a single recipe got successfully",
        data: result
    })

}
)

export const RecipeController = {
    createRecipe,
    getAllRecipe,
    findARecipeById
}