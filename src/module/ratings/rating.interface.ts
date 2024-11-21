import { Types } from "mongoose";

export type TRating  = {
    user: Types.ObjectId;
    rating: string;
    recipeId: Types.ObjectId;
    createdAt?: Date;
}

