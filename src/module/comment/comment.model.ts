import { model, Schema } from "mongoose";
import { TComment } from "./comment.interface";

const CommentSchema = new Schema<TComment>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comment: {
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

export const Comment = model<TComment>('Comment', CommentSchema);