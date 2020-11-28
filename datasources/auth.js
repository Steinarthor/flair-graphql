const { RESTDataSource } = require("apollo-datasource-rest");

export default class AuthAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:8080/";
  }

  async login({ username, password }) {
    return this.post("login", { username, password });
  }

  async signup({ name, password, email }) {
    return this.post("signup", { name, password, email });
  }
}
