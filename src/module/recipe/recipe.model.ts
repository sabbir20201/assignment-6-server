import { model, Schema } from "mongoose";

const RecipeSchema = new Schema<TRecipe>({
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    ingredients: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
    },
    cookingTime: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const Recipe = model<TRecipe>('Recipe', RecipeSchema);