const { RESTDataSource } = require("apollo-datasource-rest");

export default class AuthAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:8080/";
  }

  async login({ email, password }) {
    return this.post("login", { email, password });
  }

  async signup({ name, password, email }) {
    return this.post("signup", { name, password, email });
  }
}
