import { Recipe } from "./recipe.model"


const createRecipeIntoDB = async (payload: TRecipe) => {
    const result = await Recipe.create(payload)
    return result
}

const getAllRecipeIntoDB = async () => {
    const result = await Recipe.find()
    return result
}


export const RecipeServices = {
    createRecipeIntoDB,
    getAllRecipeIntoDB
}