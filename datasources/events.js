const { RESTDataSource } = require("apollo-datasource-rest");
import { mocks } from "../mocks/events";

export default class EventsAPI extends RESTDataSource {
  constructor() {
    super();
    //this.baseURL = "http://localhost:8081/";
  }

  async getEvents(location) {
    const event = mocks.filter((event) => event.location === location);
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
      id: mocks.length + 1,
      title: "Polling test",
      host: "Flair",
      time: "Thu Nov 12 2020 17:40:37 GMT+0000 (Greenwich Mean Time)",
      duration: 1.5,
      category: "programming",
      location: "London",
    };
    mocks.unshift(mockEvent);
    return mockEvent;
  }
}
