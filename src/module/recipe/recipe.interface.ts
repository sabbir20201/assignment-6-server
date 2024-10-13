import { Types } from "mongoose";

export type TRecipe = {
    // _id: string;
    user:Types.ObjectId;
    image: string;
    title: string;
    description :string;
    ingredients: string;
    tag: string;
    cookingTime: string;
}       