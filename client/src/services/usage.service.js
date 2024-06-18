import createService from "./api.service";
class usageService {
  constructor(baseUrl = "/api/usage") {
    this.api = createService(baseUrl);
  }
  async createUsage(data) {
    return (await this.api.post("/create", data)).data;
  }
  async updateUsage(data) {
    return (await this.api.put("/update", data)).data;
  }
  async deleteUsage(id) {
    return (await this.api.delete(`/delete/${id}`)).data;
  }
  async getAllUsage() {
    return (await this.api.get("/getAll")).data;
  }
  async getAllUsageTrue() {
    return (await this.api.get("/getAllTrue")).data;
  }
}

export default new usageService();
