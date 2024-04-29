import { Logger } from "../../../Utils/Logger/winston.logger.js";
import UrlService from "../Services/url.service.js";
class UrlController {
  constructor() {
    this.urlService = new UrlService();
  }

  addUrl = async (req, res) => {
    try {
      const body = req.body;
      body.user_id = req.user.id;

      const addUrlStatus = await this.urlService.addUrl(body);
      if (addUrlStatus?.id?.length > 0)
        res.json({ status: true, message: "URL Added", data: addUrlStatus });
      else throw new Error("Unable To Add URL");
    } catch (error) {
      Logger.error(
        `error in addUrl: ${error?.message ? error.message : "Unknown Error"}`
      );
      res.json({ status: false, message: "Unable to create URL", data: error });
    }
  };

  updateUrl = async (req, res) => {
    try {
      const body = req.body;
      const updatedUrl = await this.urlService.updateUrl(body.id, body);
      if (updatedUrl?.id?.length > 0)
        res.json({ status: true, message: "URL Updated", data: updatedUrl });
      else throw new Error("Unable To Update URL");
    } catch (error) {
      Logger.error(
        `error in updateUrl: ${
          error?.message ? error.message : "Unknown Error"
        }`
      );
      res.json({ status: false, message: "Unable to update URL", data: error });
    }
  };

  getUrlsByUser = async (req, res) => {
    try {
      const body = req.body;
      const updateUrlStatus = await this.urlService.getUrlsByUserId(
        req.user.id
      );
      if (updateUrlStatus)
        res.json({
          status: true,
          message: "Retreived URLs List",
          data: updateUrlStatus,
        });
      else throw new Error("Unable To Fetch URLs");
    } catch (error) {
      Logger.error(
        `error in updateUrl: ${
          error?.message ? error.message : "Unknown Error"
        }`
      );
      res.json({
        status: false,
        message: "Unable to getUrlsByUser",
        data: error,
      });
    }
  };

  getUrlByShortCode = async (req, res) => {
    try {
      const { short_code } = req.params;
      const url = await this.urlService.getUrlByShortCode(short_code);
      if (url?.id?.length > 0) {
        //redirect to this url
        res.redirect(url.url);
      } else throw new Error("Invalid Object Retreived");
    } catch (error) {
      console.log(
        `Error in getUrlByShortCode: ${
          error?.message ? error.message : "Unknown Error"
        }`
      );
      res.json({ status: false, message: "Invalid Short code" });
    }
  };
}
export default UrlController;
