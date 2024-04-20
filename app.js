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

// Function to print all routes
function printRoutes() {
  const routes = [];

  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // routes registered directly on the app
      const { path, methods } = middleware.route;
      const methodNames = Object.keys(methods).join(", ").toUpperCase();
      routes.push(`${methodNames} ${path}`);
    } else if (middleware.name === "router") {
      // router middleware
      middleware.handle.stack.forEach((handler) => {
        const { route } = handler;
        if (route) {
          const methodNames = route.stack
            .map((layer) => layer.method.toUpperCase())
            .join(", ");
          routes.push(`${methodNames} ${route.path}`);
        }
      });
    }
  });

  console.log("All registered routes:");
  routes.forEach((route) => console.log(route));
}

app.listen(config.Application.port, () => {
  Logger.info(`Server started at port: ${config.Application.port}`);
  printRoutes();
});
