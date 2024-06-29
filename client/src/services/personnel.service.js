import createService from "./api.service";
class personnelService {
  constructor(baseUrl = "/api/personnel") {
    this.api = createService(baseUrl);
  }
  async getPersonnel() {
    return (await this.api.get("/")).data;
  }
}
export default new personnelService();
