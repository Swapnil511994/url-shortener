import { registerRoutes } from "./Router/index.router.js";
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import config from "./Config/config.js";
import { Logger } from "./Utils/Logger/winston.logger.js";

const app = express();

//helmet
app.use(helmet());

//body parser
app.use(bodyParser.json({ limit: "25MB" }));
app.use(bodyParser.text());

//routes
registerRoutes(app);

app.listen(config.Application.port, () => {
  Logger.info(`Server started at port: ${config.Application.port}`);
  //   printRoutes();
});
