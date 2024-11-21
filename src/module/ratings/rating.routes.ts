import express from "express"
import { auth } from "../auth/auth";
import { RatingController } from "./raitng.controller";

const router = express.Router();

router.post("/rating/:id",auth(['user']),RatingController.addRatingController);
router.get("/allRating/:id",RatingController.getAllRatingControllerById);
// router.delete("/rating/:id",CommentController.deleteComment);
// router.put("/rating/:id",CommentController.updateComment);

export const RatingRoutes = router