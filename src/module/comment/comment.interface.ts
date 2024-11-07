import { Types } from "mongoose";

export type TComment  = {
    user: Types.ObjectId;
    comment: string;
    recipeId: Types.ObjectId;
    createdAt?: Date;
}

