import { Sequelize } from "sequelize";
import config from "../Config/config.js";
import { Logger } from "../Utils/Logger/winston.logger.js";

let instance = null;
class DatabaseSingleton {
  constructor() {
    throw new Error("Use static method getInstance instead of constructor");
  }

  static getInstance() {
    try {
      if (!instance) {
        instance = new Sequelize(
          config.Mysql.database,
          config.Mysql.username,
          config.Mysql.password,
          {
            host: config.Mysql.host,
            port: config.Mysql.port,
            dialect: "mysql",
            logging: (msg) => console.log(`[MySQL] ${msg}`), // Custom logging function
          }
        );

        // Test the database connection
        instance
          .authenticate()
          .then(() => {
            Logger.info("Database connection established successfully.");
          })
          .catch((err) => {
            throw new Error(err);
          });
      }

      return instance;
    } catch (error) {
      Logger.error("Error initializing database:", error);
      process.exit(1); // Exit the process if an error occurs during initialization
    }
  }
}

export const db = await DatabaseSingleton.getInstance();
