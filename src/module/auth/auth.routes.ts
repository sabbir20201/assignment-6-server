import express from "express"
import { AuthServices } from "./auth.service";
import { AuthController } from "./auth.controller";
import { auth } from "./auth";


const router = express.Router();

router.post("/login", AuthController.login);
router.put("/changePassword", auth(['user','admin']),AuthController.changedPassword);
router.put("/userUpdate", auth(['user']), AuthController.updateUserInformation);
router.post("/forgetPassword",AuthController.forgetPassword);


export const AuthRoutes = router