"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeServices = void 0;
const user_model_1 = require("../user/user.model");
const recipe_model_1 = require("./recipe.model");
const createRecipeIntoDB = (payload, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: userEmail });
    console.log('user from services', user);
    if (!user) {
        throw new Error("user not found");
    }
    const userID = user._id.toString();
    const recipeData = Object.assign(Object.assign({}, payload), { user: userID });
    // console.log('recipeData', recipeData, 'user', user);
    const result = yield recipe_model_1.Recipe.create(recipeData);
    return result;
});
// const getAllBookings: RequestHandler = catchAsync(async (req, res) => {
//     const AllBookings = await Booking.find({ isBooked: "confirmed" })
//         .populate({
//             path: 'facility',
//             select: "name image description pricePerHour location isDeleted"
//         })
//         .populate({
//             path: "user",
//             select: "name email phone role address"
//         })
//         .exec();
//     res.status(200).json({
//         success: true,
//         statusCode: 200,
//         message: "Bookings retrieved successfully",
//         data: AllBookings
//     })
// })
const getAllRecipeIntoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_model_1.Recipe.find()
        .populate({
        path: "user",
        select: "userName email profileImage role"
    })
        .exec();
    return result;
});
const findRecipeByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield recipe_model_1.Recipe.findOne({ _id: id });
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
const findRecipeByUserIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield recipe_model_1.Recipe.find({ user: id });
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
// const ratingRecipe = async (recipeId: string, userId: string, rating: number) => {
//     const recipe = await Recipe.findById(recipeId);
//     if (!recipe) {
//         throw new AppError(404, 'recipe not found')
//     }
//     recipe.rating = ((recipe.rating * recipe.ratingCount) + rating) / (recipe.ratingCount + 1)
//     recipe.ratingCount += 1;
//     await recipe.save();
//     return recipe
// }
// const getAllCommentIntoDB = async (recipeId: string, userId: string, CommentText: string) => {
//     const recipe = await Recipe.findById(recipeId);
//     if (!recipe) {
//         throw new AppError(404, 'recipe not found')
//     }
//     recipe.comments?.push({ user: userId, comment: CommentText });
//     await recipe.save();
//     return recipe.comments;
// }
// const voteRecipeInToDB =  async(recipeId: string, userId: string, voteType: 'upVote' | 'downVote')=>{
//     const recipe = await Recipe.findById(recipeId);
//     if(!recipe){
//         throw new AppError(404, '')
//     }
//     if(voteType === 'upVote'){
//         recipe.upVotes.addToSet(userId)
//         recipe.downVotes.pull(userId)
//     }else{
//         recipe.downVotes.addToSet(userId);
//         recipe.upVotes.pull(userId);
//     }
//     await recipe.save();
//     return {uupVotes: recipe.upVotes?.length, downVotes: recipe.downVotes?.length}
// }
const deleteRecipeServices = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield recipe_model_1.Recipe.deleteOne({ _id: id });
        console.log('result from service', result);
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
const deleteRecipeServicesById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield recipe_model_1.Recipe.deleteOne({ _id: id });
        console.log('result from service', result);
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
// const updateRecipeServicesById = async (id: string,payload: string) => {
//     try {
//         console.log('from service id',id);
//         const updateComment = await Recipe.findByIdAndUpdate(id, payload, {
//             new: true,
//             runValidators: true
//         })
//         return updateComment
//     } catch (error) {
//         console.log(error);
//     }
// }
exports.RecipeServices = {
    createRecipeIntoDB,
    getAllRecipeIntoDB,
    findRecipeByIdFromDB,
    deleteRecipeServices,
    findRecipeByUserIdFromDB,
    deleteRecipeServicesById
    // updateRecipeServicesById
};
