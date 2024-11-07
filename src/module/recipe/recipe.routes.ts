import express from "express"
import { RecipeController} from "./recipe.controller";
import { auth } from "../auth/auth";
const router = express.Router();

router.post("/",auth(["user"]),RecipeController.createRecipe);
router.get("/", RecipeController.getAllRecipe);
router.get("/:id", RecipeController.findRecipeById);
router.delete("/:id", RecipeController.deleteRecipeController);
// router.put("/:id", RecipeController.updateRecipeControllerById);

export const RecipeRoutes = router