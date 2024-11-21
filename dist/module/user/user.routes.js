"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = require("../auth/auth");
const router = express_1.default.Router();
router.post("/signup", user_controller_1.UserController.register);
router.post("/admin/signup", user_controller_1.UserController.adminRegister);
router.get("/", user_controller_1.UserController.getAllUser);
router.get("/:id", user_controller_1.UserController.getSingleUser);
router.put('/follow', (0, auth_1.auth)(["user", 'admin']), user_controller_1.UserController.follower);
router.put('/unFollow', (0, auth_1.auth)(["user", 'admin']), user_controller_1.UserController.unFollower);
router.delete("/admin/:id", user_controller_1.UserController.deleteUserControllerByAdmin);
exports.UserRoutes = router;
