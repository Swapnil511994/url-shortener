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
      const userObj = await this.User.findByPk(userId);
      if (userObj?.id > 0) return userObj;
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
        where: {
          email: emailId,
        },
      });
      if (userObj?.id > 0) return userObj;
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
  };

  updateUser = async (userId, userBody) => {
    try {
      delete userBody.id;

      if (userBody?.password)
        userBody.password = await bcrypt.hash(userBody.password, 10);

      const updateUserStatus = await this.User.update(userBody, {
        where: {
          id: userId,
        },
      });

      if (updateUserStatus?.length > 0 && updateUserStatus[0] === 1)
        return true;
      else throw new Error("Unable to update user");
    } catch (error) {
      Logger.error(
        `Error in updateUser: ${
          error?.message ? error.message : "Unknown Error"
        }`
      );
    }
  };

  addUser = async (userBody) => {
    try {
      if (userBody?.password)
        userBody.password = await bcrypt.hash(userBody.password, 10);
      const addUserStatus = await this.User.create(userBody);
      return addUserStatus;
    } catch (error) {
      Logger.error(
        `Error in addUser: ${error?.message ? error.message : "Unknown Error"}`
      );
      return null;
    }
  };
}

export default UserService;
