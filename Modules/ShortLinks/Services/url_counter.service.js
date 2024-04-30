import { db } from "../../../Database/db.singleton.js";
import { Logger } from "../../../Utils/Logger/winston.logger.js";

class URLCounterService {
  constructor() {
    const { UrlCounter } = db.models;
    this.UrlCounter = UrlCounter;
  }

  getTotalCount = async () => {
    try {
      const counter = await this.UrlCounter.findOne({});
      if (counter) {
        return counter.counter;
      } else {
        const newCounter = this.UrlCounter({ counter: 1 });
        await newCounter.save();
        return 1;
      }
    } catch (error) {
      Logger.error(
        `Unable to load counter: ${error?.message || "Unknown Error"}`
      );
      return -1;
    }
  };

  updateTotalCount = async () => {
    try {
      const counter = await this.UrlCounter.findOne({});
      if (counter) {
        counter.counter += 1;
        await counter.save();
        return true;
      } else {
        const newCounter = this.UrlCounter({ counter: 1 });
        await newCounter.save();
        return true;
      }
    } catch (error) {
      Logger.error(
        `Unable to update counter: ${error?.message || "Unknown Error"}`
      );
      return false;
    }
  };
}

export default URLCounterService;
