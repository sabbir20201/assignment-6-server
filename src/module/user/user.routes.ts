import express from "express"
import { UserController } from "./user.controller";
import { auth } from "../auth/auth";


const router = express.Router();

router.post("/signup", UserController.register);
router.get("/", UserController.getAllUser);
router.get("/:id", UserController.getSingleUser);
router.put('/follow', auth(["user", 'admin']),UserController.follower )
router.put('/unFollow', auth(["user", 'admin']),UserController.unFollower )

export const UserRoutes = router