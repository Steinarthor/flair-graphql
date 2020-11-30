const { RESTDataSource } = require("apollo-datasource-rest");

export default class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:8081/";
  }

  willSendRequest(request) {
    request.headers.set("Authorization", `${this.context.token}`);
  }

  async user() {
    try {
      const userResponse = await this.get("getuser");
      return userResponse.Data;
    } catch (err) {
      console.log("err", err);
    }
  }

  async addUser({ name, email }) {
    try {
      const addUserResponse = await this.post("adduser", {
        name,
        email,
      });
      return addUserResponse.Data;
    } catch (error) {
      console.log("err", error);
    }
  }
}
