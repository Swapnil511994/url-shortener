import userModel from "../Modules/Auth/Models/user.model.js";
import urlModel from "../Modules/ShortLinks/Models/url.model.js";

export const initiateModels = (mongoose) => {
  userModel(mongoose);
  urlModel(mongoose);
};
