"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const recipe_controller_1 = require("./recipe.controller");
const auth_1 = require("../auth/auth");
const router = express_1.default.Router();
router.post("/", (0, auth_1.auth)(["user"]), recipe_controller_1.RecipeController.createRecipe);
router.get("/", recipe_controller_1.RecipeController.getAllRecipe);
router.get("/:id", recipe_controller_1.RecipeController.findARecipeById);
exports.RecipeRoutes = router;
