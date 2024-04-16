import dotenv from "dotenv";
dotenv.config();

const config = {
  Mysql: {
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    logging: process.env.MYSQL_LOGGING,
  },
  Application: {
    port: process.env.APP_PORT,
  },
};

export default config;