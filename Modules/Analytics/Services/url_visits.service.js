import { db } from "../../../Database/db.singleton.js";
import { Logger } from "../../../Utils/Logger/winston.logger.js";

class UrlVisitsService {
  constructor() {
    const { UrlVisits } = db.models;
    this.UrlVisits = UrlVisits;
  }

  addUrlVisit = async (visitBody) => {
    try {
      const urlVisit = this.UrlVisits(visitBody);
      await urlVisit.save();
      return urlVisit;
    } catch (error) {
      Logger.error(
        `Error in addUrlVisit: ${
          error?.message ? error.message : "Unknown Error"
        }`
      );
    }
  };

  getUrlVisits = async (urlId, pageSize, offset) => {
    try {
      const visits = await this.UrlVisits.find({ url_id: urlId })
        .sort({ createdAt: -1 }) // Sort by creation time, newest first
        .skip(offset) // Skip the first 'offset' results
        .limit(pageSize); // Limit the results to 'pageSize'

      return visits;
    } catch (error) {
      Logger.error(
        `Error in getUrlVisits: ${
          error?.message ? error.message : "Unknown Error"
        }`
      );
      return []; // Return an empty array in case of an error
    }
  };
}
