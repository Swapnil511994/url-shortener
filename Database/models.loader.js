import userModel from "../Modules/Auth/Models/user.model.js";
import urlModel from "../Modules/ShortLinks/Models/url.model.js";
import urlCounterModel from "../Modules/ShortLinks/Models/url_counter.model.js";
import urlVisitModel from "../Modules/Analytics/Models/url_visit.model.js";
import analyticModel from "../Modules/Analytics/Models/analytic.model.js";

export const initiateModels = (mongoose) => {
  userModel(mongoose);
  urlModel(mongoose);
  urlCounterModel(mongoose);
  urlVisitModel(mongoose);
  analyticModel(mongoose);
};
