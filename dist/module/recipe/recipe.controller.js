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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const http_status_1 = __importDefault(require("http-status"));
const recipe_service_1 = require("./recipe.service");
const createRecipe = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const recipeData = req.body;
    const userEmail = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
    // console.log('useremaul', userEmail);
    const result = yield recipe_service_1.RecipeServices.createRecipeIntoDB(recipeData, userEmail);
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User create successfully',
        data: result
    });
}));
const getAllRecipe = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_service_1.RecipeServices.getAllRecipeIntoDB();
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'get all recipe successfully',
        data: result
    });
}));
const findRecipeById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield recipe_service_1.RecipeServices.findRecipeByIdFromDB(id);
    res.json({
        success: true,
        statusCode: 200,
        message: "Single recipe getting successfully",
        data: result
    });
}));
const findRecipeByUserId = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    console.log('user id single recipe', id);
    const result = yield recipe_service_1.RecipeServices.findRecipeByUserIdFromDB(id);
    res.json({
        success: true,
        statusCode: 200,
        message: "Single user's recipes retrieve successfully",
        data: result
    });
}));
// const ratingRecipeController = catchAsync(async (req: Request, res: Response) => {
//     const { recipeId, rating } = req.body;
//     const userId = req?.user._id;
//     const result = await RecipeServices.ratingRecipe(recipeId, userId, rating)
//     res.json({
//         success: true,
//         statusCode: 200,
//         message: "rate recipe got successfully",
//         data: result
//     })})
// const voteRecipeController = catchAsync(async (req: Request, res: Response) => {
//     const { recipeId, voteType } = req.body;
//     const userId = req?.user._id;
//     const result = await RecipeServices.voteRecipeInToDB(recipeId, userId, comment)
//     res.json({
//         success: true,
//         statusCode: 200,
//         message: "comment added successfully",
//         data: result
//     })})
// delete a recepi 
const deleteRecipeController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    console.log('id from delete', id);
    const result = yield recipe_service_1.RecipeServices.deleteRecipeServices(id);
    res.json({
        success: true,
        statusCode: 200,
        message: "Recipe deleted successfully",
        data: result
    });
}));
const deleteRecipeControllerByAdmin = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    console.log('id from delete', id);
    const result = yield recipe_service_1.RecipeServices.deleteRecipeServices(id);
    res.json({
        success: true,
        statusCode: 200,
        message: "Recipe deleted successfully by admin",
        data: result
    });
}));
// update 
// const updateRecipeControllerById = catchAsync(async (req: Request, res: Response) => {
//     const id = req.params.id as string;
//     const updatedData = req.body;
//     const result = await RecipeServices.updateRecipeServicesById(id, updatedData)
//     console.log('updated id  =>', id);
//     console.log('UPDATE data =>', updatedData);
//     res.json({
//         success: true,
//         statusCode: 200,
//         message: "comment updated successfully",
//         data: result
//     })
// })
exports.RecipeController = {
    createRecipe,
    getAllRecipe,
    findRecipeById,
    deleteRecipeController,
    findRecipeByUserId,
    deleteRecipeControllerByAdmin
    // updateRecipeControllerById
};
