import express from "express"
import { auth } from "../auth/auth";
import { CommentController } from "../comment/comment.controller";

const router = express.Router();

router.post("/comment/:id", auth(["user"]),CommentController.addCommentController);
router.get("/allComment/:id",CommentController.getAllCommentById);
router.delete("/allComment/:id",CommentController.deleteComment);
router.put("/allComment/:id",CommentController.updateComment);

export const CommentRoutes = router