const LocationService = require("../services/location.service");
const ApiRes = require("../utils/api-res");
const ApiError = require("../utils/api-error");

module.exports = {
  createDmp: async (req, res, next) => {
    const locationService = new LocationService();
    const { dpmname } = req.body;
    const createdDpm = await locationService.createDeparment(dpmname);
    return res.json(createdDpm);
  },
  async createRoom(req, res, next) {
    try {
      const locationService = new LocationService();
      const { roomname, id_dep } = req.body;
      const room = await locationService.createRoom(roomname, id_dep);
      res.status(201).json(room);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async updateDeparment(req, res, next) {
    try {
      const locationService = new LocationService();
      const { id, data } = req.body;
      const room = await locationService.updateDeparment(id, data);
      res.status(201).json(room);
    } catch (error) {}
  },
  async getDeparments(req, res, next) {
    try {
      const locationService = new LocationService();

      const dep = await locationService.getDeparments();
      res.status(201).json(dep);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getRooms(req, res, next) {
    try {
      const locationService = new LocationService();

      const room = await locationService.getRooms();
      res.status(201).json(room);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
