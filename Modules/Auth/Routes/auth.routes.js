import express from "express";
import AuthController from "../Controllers/auth.controller.js";
import {
  registerRequestValidator,
  loginRequestValidator,
  updateUserRequestValidator,
} from "../Validations/auth.validation.js";
import { authenticateToken } from "../Middleware/auth.middleware.js";
import asyncHandler from "express-async-handler";

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post("/auth/login", loginRequestValidator, authController.login);
authRouter.post(
  "/auth/register",
  registerRequestValidator,
  authController.register
);
authRouter.post(
  "/auth/update-user",
  updateUserRequestValidator,
  authenticateToken,
  authController.updateUser
);

export default authRouter;
