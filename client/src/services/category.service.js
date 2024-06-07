import createService from "./api.service";
class categoryService {
  constructor(baseUrl = "/api/category") {
    this.api = createService(baseUrl);
  }
  async getCate() {
    return (await this.api.get("/getAllCategory")).data;
  }
}

export default new categoryService();
