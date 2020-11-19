const { RESTDataSource } = require("apollo-datasource-rest");
import { mocks } from "../mocks/events";

export default class EventsAPI extends RESTDataSource {
  constructor() {
    super();
    //this.baseURL = "http://localhost:8081/";
  }

  async getEvents(location, month, date) {
    const event = mocks.filter(
      (event) =>
        event.location === location &&
        event.month === month &&
        event.date === date
    );
    return event;
  }

  async getEvent(id) {
    const event = mocks.find((event) => event.id === id);
    return event;
  }

  async getEventCategory(category, location) {
    const event = mocks.filter(
      (event) =>
        event.category.split(" ").join("-").toLocaleLowerCase() === category &&
        event.location.split(" ").join("-").toLocaleLowerCase() === location
    );
    return event;
  }

  async getEventLocation(location) {
    const event = mocks.filter(
      (event) =>
        event.location.split(" ").join("-").toLocaleLowerCase() === location
    );
    return event;
  }

  async addEvent() {
    const mockEvent = {
      id: 1122,
      title: "TEST",
      host: "Iceland Airwaves",
      timestamp: "Thu Nov 12 2020 17:40:37 GMT+0000 (Greenwich Mean Time)",
      duration: 1.5,
      category: "music",
      location: "Reykjavík",
      month: 10,
      date: 19,
    };
    mocks.unshift(mockEvent);
    return mockEvent;
  }
}
