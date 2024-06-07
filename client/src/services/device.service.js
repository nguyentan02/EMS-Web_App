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
  async updateDevice(data) {
    return (await this.api.put("/update", data)).data;
  }
  async transferDevice(data) {
    console.log(data);
    return (await this.api.put("/transfer", data)).data;
  }
}

export default new deviceService();
