import { Types } from "mongoose";

interface TComment {
    user: Types.ObjectId;
    comment: string;
    createdAt?: Date;
}

export type TRecipe = {
    // _id: string;
    user?:Types.ObjectId;
    image: string;
    title: string;
    description :string;
    ingredients: string;
    tag: string;
    cookingTime: string;
}       