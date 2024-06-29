import createService from "./api.service";
class orderService {
  constructor(baseUrl = "/api/order") {
    this.api = createService(baseUrl);
  }
  async createOrder(data) {
    return (await this.api.post("/create", data)).data;
  }
  async updateOrder(id) {
    return (await this.api.put(`/${id}`)).data;
  }
  async getQuantity() {
    return (await this.api.get("/checkInventory")).data;
  }
  async getOrder() {
    return (await this.api.get("/")).data;
  }
  async getOrderById(id) {
    return (await this.api.get(`/${id}`)).data;
  }
}

export default new orderService();
