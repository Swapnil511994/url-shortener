import authRouter from "../Modules/Auth/Routes/auth.routes.js";
import urlRouter from "../Modules/ShortLinks/Routes/url.routes.js";

const modules = [authRouter, urlRouter];

export const registerRoutes = (app) => {
  modules.forEach((module) => {
    app.use(module);
  });
};
