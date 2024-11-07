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
    console.log(user);
    if (!user) {
        throw new Error("user not found");
    }
    // const userID = (user as any)._id.toString()
    const recipeData = Object.assign(Object.assign({}, payload), { user: user });
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
const findARecipeByIdFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield recipe_model_1.Recipe.findOne({ _id: payload });
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
exports.RecipeServices = {
    createRecipeIntoDB,
    getAllRecipeIntoDB,
    findARecipeByIdFromDB
};
