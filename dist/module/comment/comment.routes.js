"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../auth/auth");
const comment_controller_1 = require("../comment/comment.controller");
const router = express_1.default.Router();
router.post("/comment/:id", (0, auth_1.auth)(["user", "admin"]), comment_controller_1.CommentController.addCommentController);
router.get("/allComment/:id", comment_controller_1.CommentController.getAllCommentById);
router.delete("/allComment/:id", comment_controller_1.CommentController.deleteComment);
router.put("/allComment/:id", comment_controller_1.CommentController.updateComment);
exports.CommentRoutes = router;
