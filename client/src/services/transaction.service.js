import createService from "./api.service";

class transactionService {
  constructor(baseUrl = "/api/transaction") {
    this.api = createService(baseUrl);
  }
  async getPersonnel(id) {
    return (await this.api.get(`/${id}`)).data;
  }
  async getAll() {
    return (await this.api.get("/All")).data;
  }
}
export default new transactionService();
