"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipe = void 0;
const mongoose_1 = require("mongoose");
const RecipeSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.Recipe = (0, mongoose_1.model)('Recipe', RecipeSchema);
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
