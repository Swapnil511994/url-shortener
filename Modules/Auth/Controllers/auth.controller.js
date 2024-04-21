import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Logger } from "../../../Utils/Logger/winston.logger.js";
import UserService from "../Services/user.service.js";
import config from "../../../Config/config.js";

class AuthController {
  constructor() {
    this.userService = new UserService();
  }
  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const existingUser = await this.userService.getUserByEmail(email);
      if (!existingUser || existingUser?.id?.length <= 0)
        throw new Error("User Not Found");

      const passwordsMatch = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!passwordsMatch) {
        throw new Error("Invalid Credentials");
      }

      const token = jwt.sign(
        { id: existingUser.id },
        config.Authentication.privateKEY,
        config.Authentication.signInOptions
      );
      res.json({
        status: true,
        message: "Authentication Successful",
        data: { token: token },
      });
    } catch (error) {
      Logger.error(
        `Error in login: ${error?.message ? error.message : "Unknown Error"}`
      );
      res.json({ status: false, message: "Invalid Login Attempt" });
    }
  };

  register = async (req, res) => {
    try {
      const body = req.body;
      const newUser = await this.userService.addUser(body);
      if (newUser?.id?.length > 0)
        return res.json({ status: true, message: "Registration Successfull" });
      else return res.json({ status: false, message: "Registration Failed" });
    } catch (error) {
      Logger.error(
        `Error in register: ${error?.message ? error.message : "Unknown Error"}`
      );
      res.json({ status: false, message: "Invalid Login Attempt" });
    }
  };

  updateUser = async (req, res) => {
    try {
      const body = req.body;

      const existingUser = await this.userService.getUserByEmail(body.email);
      if (!existingUser || existingUser?.id?.length <= 0)
        throw new Error("User Not Found");

      const updateStatus = await this.userService.updateUser(
        existingUser.id,
        body
      );
      if (updateStatus)
        return res.json({ status: true, message: "Update Successfull" });
      else return res.json({ status: false, message: "Update Failed" });
    } catch (error) {
      Logger.error(
        `Error in updateUser: ${
          error?.message ? error.message : "Unknown Error"
        }`
      );
      res.json({ status: false, message: "User Updation Failed" });
    }
  };

  loginRegisterViaGoogle = async (req, res) => {};
}

export default AuthController;
