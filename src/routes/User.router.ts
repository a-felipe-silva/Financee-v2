import express from "express";
import { loginUser, registerUser } from "../controllers/User.controller";
import { validateRegister } from "../middlewares/validateRegister";
import { validateLogin } from "../middlewares/validateLogin";

const userRouter = express.Router();

userRouter.route("/register").post(validateRegister, registerUser);

userRouter.route("/login").post(validateLogin, loginUser);

export default userRouter;
