import express from "express"
import { RecipeController} from "./recipe.controller";
import { auth } from "../auth/auth";
const router = express.Router();

router.post("/",auth(["user", "admin"]),RecipeController.createRecipe);
router.get("/", RecipeController.getAllRecipe);
router.get("/:id", RecipeController.findRecipeById);
router.get("/user/:id", RecipeController.findRecipeByUserId);
router.delete("/:id", RecipeController.deleteRecipeController);
router.delete("/admin/:id", RecipeController.deleteRecipeControllerByAdmin);
// router.put("/:id", RecipeController.updateRecipeControllerById);

export const RecipeRoutes = router