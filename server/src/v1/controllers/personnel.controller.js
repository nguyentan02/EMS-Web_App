const ApiRes = require("../utils/api-res");
const ApiError = require("../utils/api-error");
const PersonnelService = require("../services/personnel.service");

module.exports = {
  getPersonnel: async (req, res, next) => {
    const personnelService = new PersonnelService();
    return res.json(await personnelService.getPersonnel());
  },
};
