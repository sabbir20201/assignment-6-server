import express from "express"
import { RecipeController} from "./recipe.controller";

const router = express.Router();

router.post("/", RecipeController.createRecipe);
router.get("/", RecipeController.getAllRecipe);


export const RecipeRoutes = router