import createService from "./api.service";
class deviceService {
  constructor(baseUrl = "/api/device") {
    this.api = createService(baseUrl);
  }
  async createDevice(data) {
    return (await this.api.post("/createDevice", data)).data;
  }
  async getAllDevices() {
    return (await this.api.get("/getDevices")).data;
  }
  async getAllDevicesNoActive() {
    return (await this.api.get("/getNoActive")).data;
  }
  async deleteDevice(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
  async updateDevice(data) {
    return (await this.api.put("/update", data)).data;
  }
  async transferDevice(data) {
    return (await this.api.put("/transfer", data)).data;
  }
  async historyTrans() {
    return (await this.api.get("/histransfer")).data;
  }
}

export default new deviceService();
