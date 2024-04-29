import dotenv from "dotenv";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();

// Get the __dirname equivalent in ES Module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// PRIVATE and PUBLIC key
const privateKEYPath = path.join(__dirname, "Keys", "private.key");
const privateKEY = fs.readFileSync(privateKEYPath, "utf8");

const publicKEYPath = path.join(__dirname, "Keys", "public.key");
const publicKEY = fs.readFileSync(publicKEYPath, "utf8");

const config = {
  Mysql: {
    database: process.env.MYSQL_DATABASE || "",
    host: process.env.MYSQL_HOST || "",
    username: process.env.MYSQL_USERNAME || "",
    password: process.env.MYSQL_PASSWORD || "",
    port: process.env.MYSQL_PORT || 3306,
    logging: process.env.MYSQL_LOGGING,
  },
  Mongo: {
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    uri: process.env.MONGO_URI,
  },
  Application: {
    port: process.env.APP_PORT,
  },
  Authentication: {
    privateKEY: privateKEY,
    publicKEY: publicKEY,
    signInOptions: {
      issuer: "Snipr",
      audience: "https://snipr.in",
      expiresIn: "12h",
      algorithm: "RS256",
    },
  },
};

export default config;
