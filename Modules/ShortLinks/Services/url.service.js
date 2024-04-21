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

  getUrlsByUserId = async (userId, page = 1, pageSize = 10) => {
    try {
      const offset = (page - 1) * pageSize;
      const limit = pageSize;

      const urls = await this.Url.findAndCountAll({
        where: {
          user_id: userId,
        },
        offset: offset,
        limit: limit,
      });

      if (urls.rows.length >= 0) {
        const totalPages = Math.ceil(urls.count / limit);
        return {
          data: urls.rows,
          pagination: {
            page: page,
            pageSize: limit,
            rowCount: urls.count,
            totalPages: totalPages,
          },
        };
      }
      return null;
    } catch (error) {
      Logger.error(`Error in getUrlsByUserId: 
        ${error?.message ? error.message : "Unknown Error"}`);
      return null;
    }
  };

  getUrlByShortCode = async (shortCode) => {
    try {
      const url = await this.Url.findOne({
        where: {
          short_code: shortCode,
        },
        attributes: ["id", "url"],
      });

      if (url?.id > 0) return url;
      else throw new Error("Invalid Object Retreived");
    } catch (error) {
      Logger.error(`Error in getUrlByShortCode: 
      ${error?.message ? error.message : "Unknown Error"}`);
      return null;
    }
  };

  updateUrl = async (id, urlBody) => {
    try {
      delete urlBody.id;
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

  addUrl = async (urlBody) => {
    try {
      const addUrlStatus = await this.Url.create(urlBody);
      return addUrlStatus;
    } catch (error) {
      Logger.error(`Error in addUrl: 
      ${error?.message ? error.message : "Unknown Error"}`);
      return false;
    }
  };
}

export default UrlService;
