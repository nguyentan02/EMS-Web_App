import createService from "./api.service";
class maintenanceService {
  constructor(baseUrl = "/api/maintenance") {
    this.api = createService(baseUrl);
  }
  async createMaintanance(data) {
    return (await this.api.post("/create", data)).data;
  }
  async updateMaintenance(data) {
    return (await this.api.put("/update", data)).data;
  }
  async deleteMaterial(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
  async deleteMaintenance(id) {
    return (await this.api.delete(`/deleted/${id}`)).data;
  }
  async getMaintenace() {
    return (await this.api.get("/")).data;
  }
  async getInventory() {
    return (await this.api.get("/inventory")).data;
  }
  async getStatus() {
    return (await this.api.get("/status")).data;
  }
  // async getMaterialBItem(id) {
  //   return (await this.api.get(`/${id}`)).data;
  // }
}

export default new maintenanceService();
