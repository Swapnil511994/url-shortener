import authRouter from "../Modules/Auth/Routes/auth.routes.js";

const modules = [authRouter];

export const registerRoutes = (app) => {
  modules.forEach((module) => {
    app.use(module);
  });
};
