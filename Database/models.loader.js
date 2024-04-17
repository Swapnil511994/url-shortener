import userModel from "../Modules/User/Models/user.model.js";
import urlModel from "../Modules/ShortLinks/Models/url.model.js";

export const initiateModels = (sequelize) => {
  userModel(sequelize);
  urlModel(sequelize);

  for (const key of Object.keys(sequelize.models)) {
    if (sequelize.models[key].associate)
      sequelize.models[key].associate(sequelize.models);
  }
};
