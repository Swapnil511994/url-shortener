import { db } from "../../../Database/db.singleton.js";
import { Logger } from "../../../Utils/Logger/winston.logger.js";
import bcrypt from "bcrypt";

class UserService {
  constructor() {
    const { User } = db.models;
    this.User = User;
  }

  getUserById = async (userId) => {
    try {
      if (userId <= 0) throw new Error("Invalid userId");
      const userObj = await this.User.findById(userId);
      if (userObj?.id?.length > 0) return userObj;
      else throw new Error("Invalid Object retreived");
    } catch (error) {
      Logger.error(
        `Error in getUserById: ${
          error?.message ? error.message : "Unknown Error"
        }`
      );
      return null;
    }
  };

  getUserByEmail = async (emailId) => {
    try {
      if (emailId?.length <= 0) throw new Error("Invalid input emailId");
      const userObj = await this.User.findOne({
        email: emailId,
      });
      if (userObj?.id?.length > 0) return userObj;
      else throw new Error("Invalid Object Returned");
    } catch (error) {
      Logger.error(
        `Error in getUserByEmail: ${
          error?.message ? error.message : "Unknown Error"
        }`
      );
      return null;
    }
  };

  getAllUsers = async () => {
    //return all users
    try {
      return await this.User.find({});
    } catch (error) {
      Logger.error(
        `Error in getAllUsers: ${
          error.message ? error.message : "Unknown Error"
        }`
      );
      return [];
    }
  };

  updateUser = async (userId, userBody) => {
    try {
      delete userBody.id;

      if (userBody?.password)
        userBody.password = await bcrypt.hash(userBody.password, 10);

      const updatedUser = await this.User.findByIdAndUpdate(userId, userBody, {
        new: true,
      });
      if (updatedUser) return true;
      else throw new Error("Unable to update user");
    } catch (error) {
      Logger.error(
        `Error in updateUser: ${
          error?.message ? error.message : "Unknown Error"
        }`
      );
      return false;
    }
  };

  addUser = async (userBody) => {
    try {
      if (userBody?.password)
        userBody.password = await bcrypt.hash(userBody.password, 10);
      const newUser = new this.User(userBody);
      await newUser.save();
      return newUser;
    } catch (error) {
      Logger.error(
        `Error in addUser: ${error?.message ? error.message : "Unknown Error"}`
      );
      return null;
    }
  };
}

export default UserService;
