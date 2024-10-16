import express from "express"
import { UserController } from "./user.controller";


const router = express.Router();

router.post("/signup", UserController.register);
router.get("/", UserController.getAllUser);

export const UserRoutes = router