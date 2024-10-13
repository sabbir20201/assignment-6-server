import express from "express"
import { RecipeController} from "./recipe.controller";
import { auth } from "../auth/auth";

const router = express.Router();

router.post("/",auth(["user"]),RecipeController.createRecipe);
router.get("/", RecipeController.getAllRecipe);
router.get("/:id", RecipeController.findARecipeById);


export const RecipeRoutes = router