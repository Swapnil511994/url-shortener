import { Sequelize } from "sequelize";
import config from "../Config/config.js";
import { Logger } from "../Utils/Logger/winston.logger.js";
import { initiateModels } from "./models.loader.js";

let instance = null;
class DatabaseSingleton {
  constructor() {
    throw new Error("Use static method getInstance instead of constructor");
  }

  static async getInstance() {
    try {
      if (!instance) {
        instance = new Sequelize(
          config.Mysql.database,
          config.Mysql.username,
          config.Mysql.password,
          {
            database: config.Mysql.database,
            host: config.Mysql.host,
            port: config.Mysql.port,
            dialect: "mysql",
            logging: true,
          }
        );

        // Test the database connection
        await instance.authenticate();

        //regiister models
        initiateModels(instance);

        //sync the database
        await instance.sync({ force: false });

        Logger.info("Database connection established successfully.");
      }

      return instance;
    } catch (error) {
      Logger.error("Error initializing database:", error);
      process.exit(1); // Exit the process if an error occurs during initialization
    }
  }
}

export const db = await DatabaseSingleton.getInstance();
