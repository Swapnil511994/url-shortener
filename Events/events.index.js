import EventEmitter from "events";

class UrlShortenerEventEmitter extends EventEmitter {}
const analyticsEmitter = new UrlShortenerEventEmitter();

const eventMappings = [
  {
    eventName: "visit",
    eventHandler: () => {
      console.log("Visit Occured");
    },
  },
];

const initiateURLEvents = () => {
  eventMappings.forEach((eventMapping) => {
    analyticsEmitter.on(eventMapping.eventName, eventMapping.eventHandler);
  });
};
initiateURLEvents();

export default analyticsEmitter;
