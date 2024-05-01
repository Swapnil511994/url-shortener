import { db } from "../../../Database/db.singleton.js";
import { Logger } from "../../../Utils/Logger/winston.logger.js";
import UrlService from "../../ShortLinks/Services/url.service.js";

class AnalyticsService {
  constructor() {
    const { UrlAnalytics, Url } = db.models;
    this.UrlAnalytics = UrlAnalytics;
    this.Url = Url;
    this.urlService = new UrlService();
  }

  addTotalVisit = async (shortCode) => {
    try {
      //find url object
      const existingUrlObject = await this.urlService.getUrlByShortCode(
        shortCode
      );
      if (!existingUrlObject || existingUrlObject?.id?.length <= 0) {
        throw new Error(`Unable to find associated URL Object`);
      }

      let analytics = await this.UrlAnalytics.findById(existingUrlObject.id);
      if (!analytics) {
        analytics = new this.UrlAnalytics({
          url_id: existingUrlObject.id,
          total_visits: 1,
        });
      }

      if (!analytics) throw new Error("Unable to add/ update UrlAnalytics");

      analytics.total_visits += 1;
      await analytics.save();

      return true;
    } catch (error) {
      Logger.error(
        `Error in addTotalVisit: ${
          error?.message ? error.message : "Unknown Error"
        }`
      );
      return false;
    }
  };

  addUniqueVisit = async (shortCode) => {};
}

export default AnalyticsService;
