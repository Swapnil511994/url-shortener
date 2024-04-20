import express from "express";
import AuthController from "../Controllers/auth.controller.js";
import asyncHandler from "express-async-handler";

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post("/auth/login", asyncHandler(authController.login));
authRouter.post("/auth/register", asyncHandler(authController.register));

export default authRouter;
