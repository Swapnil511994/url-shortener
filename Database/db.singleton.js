import mongoose from "mongoose";
import config from "../Config/config.js";
import { Logger } from "../Utils/Logger/winston.logger.js";
import { initiateModels } from "./models.loader.js";

let instance = null;

class DatabaseSingleton {
  constructor() {
    throw new Error("Use static method getInstance instead of constructor");
  }

  static async getInstance() {
    if (!instance) {
      try {
        instance = await mongoose.connect(config.Mongo.uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        initiateModels(mongoose);
        Logger.info("Database connection established successfully.");
      } catch (error) {
        Logger.error(`Error initializing database: ${error}`);
        process.exit(1);
      }
    }
    return instance;
  }
}

export const db = await DatabaseSingleton.getInstance();
