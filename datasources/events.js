const { RESTDataSource } = require("apollo-datasource-rest");
import { mocks } from "../mocks/events";

export default class EventsAPI extends RESTDataSource {
  constructor() {
    super();
    //this.baseURL = "http://localhost:8081/";
  }

  async getEvents() {
    return mocks;
  }

  async addEvent() {
    const mockEvent = {
      id: mocks.length + 1,
      title: "Polling test",
      hoast: "Flair",
      time: "Thu Nov 12 2020 17:40:37 GMT+0000 (Greenwich Mean Time)",
      duration: 1.5,
      category: "programming",
      location: "London",
    };
    mocks.unshift(mockEvent);
    return mockEvent;
  }
}
