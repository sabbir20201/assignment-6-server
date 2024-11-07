import { model, Schema } from "mongoose";
import { TRecipe } from "./recipe.interface";

const RecipeSchema = new Schema<TRecipe>({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
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
    }
   
}, { timestamps: true });

export const Recipe = model<TRecipe>('Recipe', RecipeSchema);


// comments: [
//     {
//         user: {
//             type: Schema.Types.ObjectId,
//             ref: 'User',
//         },
//         comment: {
//             type: String,
         
//         },
//         createdAt: {
//             type: Date,
//             default: Date.now
//         },
//     }
// ],
// rating: {
//     type: Number,
//     default: 0
// },
// ratingCount: {
//     type: Number,
//     default: 0
// },
// upVotes: [
//     {
//         type:Schema.Types.ObjectId,
//         ref: 'User',
//     },

// ],
// downVotes: [
//     {
//         type:Schema.Types.ObjectId,
//         ref: 'User',
//     },

// ],