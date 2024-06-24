import createService from "./api.service";
class materialService {
  constructor(baseUrl = "/api/material") {
    this.api = createService(baseUrl);
  }
  async createMaterial(data) {
    return (await this.api.postForm("/create", data)).data;
  }
  async updateMaterial(data) {
    return (await this.api.putForm("/update", data)).data;
  }
  async deleteMaterial(id) {
    console.log(id);
    return (await this.api.delete(`/${id}`)).data;
  }
  async getMaterial() {
    return (await this.api.get("/")).data;
  }
  async getMaterialById(id) {
    return (await this.api.get(`/${id}`)).data;
  }
}

export default new materialService();
