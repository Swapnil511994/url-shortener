import EventEmitter from "events";

import AnalyticsEventHandler from "../Modules/Analytics/Helpers/analytics.eventhandler.js";

class UrlShortenerEventEmitter extends EventEmitter {}
const analyticsEmitter = new UrlShortenerEventEmitter();

const analyticsEventHandler = new AnalyticsEventHandler();

const eventMappings = [
  {
    eventName: "visit",
    eventHandler: analyticsEventHandler.addVisit,
  },
  {
    eventName: "visit",
    eventHandler: analyticsEventHandler.addTotalVisits,
  },
  {
    eventName: "visit",
    eventHandler: analyticsEventHandler.addUniqueVisit,
  },
];

const initiateURLEvents = () => {
  eventMappings.forEach((eventMapping) => {
    analyticsEmitter.on(eventMapping.eventName, eventMapping.eventHandler);
  });
};
initiateURLEvents();

export default analyticsEmitter;
