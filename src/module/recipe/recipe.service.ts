import { User } from "../user/user.model"
import { TRecipe } from "./recipe.interface"
import { Recipe } from "./recipe.model"


const createRecipeIntoDB = async (payload: TRecipe, userEmail: string) => {
    const user = await User.findOne({ email: userEmail })
    console.log(user);

    if (!user) {
        throw new Error("user not found")
    }
    // const userID = (user as any)._id.toString()
    const recipeData = {
        ...payload,
        user: user
    }
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
const findARecipeByIdFromDB = async (payload: string) => {
    try {
        const result = await Recipe.findOne({ _id: payload })
        return result
    } catch (error) {
        console.log(error);

    }
}

export const RecipeServices = {
    createRecipeIntoDB,
    getAllRecipeIntoDB,
    findARecipeByIdFromDB
}