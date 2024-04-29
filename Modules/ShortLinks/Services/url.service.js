import { db } from "../../../Database/db.singleton.js";
import { Logger } from "../../../Utils/Logger/winston.logger.js";

class UrlService {
  constructor() {
    const { Url } = db.models;
    this.Url = Url;
  }

  getUrlById = async (id) => {
    try {
      const url = await this.Url.findById(id);
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

      const urls = await this.Url.find({
        user_id: userId,
      })
        .skip(offset)
        .limit(limit)
        .exec();

      const count = await this.Url.countDocuments({ user_id: userId });

      if (urls.length >= 0) {
        const totalPages = Math.ceil(count / limit);
        return {
          data: urls,
          pagination: {
            page: page,
            pageSize: limit,
            rowCount: count,
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
        short_code: shortCode,
      }).select("id url");

      if (url?.id?.length > 0) return url;
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
      const updatedUrl = await this.Url.findByIdAndUpdate(id, urlBody, {
        new: true,
      });
      if (updatedUrl) return updatedUrl;
      return false;
    } catch (error) {
      Logger.error(`Error in getUrlById: 
        ${error?.message ? error.message : "Unknown Error"}`);
      return false;
    }
  };

  addUrl = async (urlBody) => {
    try {
      const newUrl = this.Url(urlBody);
      const savedUrl = await newUrl.save();
      return savedUrl;
    } catch (error) {
      Logger.error(`Error in addUrl: 
      ${error?.message ? error.message : "Unknown Error"}`);
      return null;
    }
  };
}

export default UrlService;
