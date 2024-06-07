import createService from "./api.service";
class roomService {
  constructor(baseUrl = "/api/location") {
    this.api = createService(baseUrl);
  }
  async getRooms() {
    return (await this.api.get("/rooms")).data;
  }
}

export default new roomService();
