import { db } from "../../../Database/db.singleton.js";
import { Logger } from "../../../Utils/Logger/winston.logger.js";

class UrlService {
  constructor() {
    const { Url } = db.models;
    this.Url = Url;
  }

  getUrlById = async (id) => {
    try {
      const url = await this.Url.findByPk(id);
      if (url?.id >= 0) return url;
      else return null;
    } catch (error) {
      Logger.error(`Error in getUrlById: 
      ${error?.message ? error.message : "Unknown Error"}`);
      return null;
    }
  };

  getUrlsByUserId = async (userId) => {
    try {
      const urls = await this.Url.findAll({
        where: {
          user_id: userId,
        },
      });

      if (urls.length >= 0) return urls;
      return null;
    } catch (error) {
      Logger.error(`Error in getUrlsByUserId: 
        ${error?.message ? error.message : "Unknown Error"}`);
      return null;
    }
  };

  updateUrl = async (id, urlBody) => {
    try {
      const updatedUrl = await this.Url.update(urlBody, {
        where: {
          id: id,
        },
      });
      if (updatedUrl?.length > 0 && updatedUrl[0] === 1) return true;
      return false;
    } catch (error) {
      Logger.error(`Error in getUrlById: 
        ${error?.message ? error.message : "Unknown Error"}`);
      return false;
    }
  };

  addUrl = async (urlBody) => {};
}

export default UrlService;
