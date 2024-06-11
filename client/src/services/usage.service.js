import createService from "./api.service";
class usageService {
  constructor(baseUrl = "/api/usage") {
    this.api = createService(baseUrl);
  }
  async createUsage(data) {
    return (await this.api.post("/create", data)).data;
  }
  async getAllUsage() {
    return (await this.api.get("/getAll")).data;
  }
}

export default new usageService();
