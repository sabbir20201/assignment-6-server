import { model, Schema } from "mongoose";
import { TRating } from "./rating.interface";


const CommentSchema = new Schema<TRating>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: String,
        required: true,
        trim: true
        
    },
    recipeId: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
  
});
// { timestamps: true }

export const Rating = model<TRating>('Rating', CommentSchema);