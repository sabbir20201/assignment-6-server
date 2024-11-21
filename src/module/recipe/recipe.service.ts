import AppError from "../../errors/AppError"
import { TComment } from "../comment/comment.interface"
import { User } from "../user/user.model"
import { TRecipe } from "./recipe.interface"
import { Recipe } from "./recipe.model"


const createRecipeIntoDB = async (payload: TRecipe, userEmail: string) => {
    const user = await User.findOne({ email: userEmail })
    console.log('user from services', user);

    if (!user) {
        throw new Error("user not found")
    }
    const userID = (user as any)._id.toString()
    const recipeData = {
        ...payload,
        user: userID
    }

    // console.log('recipeData', recipeData, 'user', user);

    const result = await Recipe.create(recipeData)
    return result
}
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

const getAllRecipeIntoDB = async () => {
    const result = await Recipe.find()
        .populate({
            path: "user",
            select: "userName email profileImage role"
        })
        .exec();
    return result
}
const findRecipeByIdFromDB = async (id: string) => {
    try {
        const result = await Recipe.findOne({_id: id})
        return result
    } catch (error) {
        console.log(error);
    }
}
const findRecipeByUserIdFromDB = async (id: string) => {
    try {
 
        const result = await Recipe.find({user: id})
        return result
    } catch (error) {
        console.log(error);

    }
}

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
const deleteRecipeServices = async (id: string) => {
    try {
        const result = await Recipe.deleteOne({_id: id})
        console.log('result from service', result);

        return result
    } catch (error) {
        console.log(error);
    }
}
const deleteRecipeServicesById = async (id: string) => {
    try {
        const result = await Recipe.deleteOne({_id: id})
        console.log('result from service', result);

        return result
    } catch (error) {
        console.log(error);
    }
}
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


export const RecipeServices = {
    createRecipeIntoDB,
    getAllRecipeIntoDB,
    findRecipeByIdFromDB,
    deleteRecipeServices,
    findRecipeByUserIdFromDB,
    deleteRecipeServicesById
    // updateRecipeServicesById

}