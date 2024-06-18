import createService from "./api.service";
class roomService {
  constructor(baseUrl = "/api/location") {
    this.api = createService(baseUrl);
  }
  async getRooms() {
    return (await this.api.get("/rooms")).data;
  }
  async getDeparment() {
    return (await this.api.get("/deparments")).data;
  }
}

export default new roomService();
