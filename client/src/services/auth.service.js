import createService from "./api.service";

class authService {
  constructor(baseUrl = "/api/auth") {
    this.api = createService(baseUrl);
  }

  async login(data) {
    return (await this.api.post("/login", data)).data;
  }

  async logout() {
    return (await this.api.post("/logout")).data;
  }
  async getUsers() {
    return (await this.api.get("/allUsers")).data;
  }
}

export default new authService();
