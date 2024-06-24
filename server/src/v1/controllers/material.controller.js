const ApiRes = require("../utils/api-res");
const ApiError = require("../utils/api-error");
const MaterialService = require("../services/material.service");

module.exports = {
  createMaterial: async (req, res, next) => {
    // console.log(req);
    try {
      const file = req.file;
      console.log(file);
      const materialService = new MaterialService();
      const { name, description, unit } = req.body;

      const newMaterial = await materialService.newMaterial(
        name,
        description,
        file.path,
        unit
      );
      return res.json(newMaterial);
    } catch (error) {
      return new ApiError(401, "Vui lòng điền thông tin");
    }
  },
  updateMaterial: async (req, res, next) => {
    try {
      const file = req.file;
      console.log(file);
      const materialService = new MaterialService();
      const { id, name, description, unit } = req.body;

      const newMaterial = await materialService.updateMaterial(
        id,
        name,
        file.path,
        description,
        unit
      );
      return res.json(newMaterial);
    } catch (error) {
      return new ApiError(401, "Vui lòng điền thông tin");
    }
  },
  getMaterial: async (req, res, next) => {
    const materialService = new MaterialService();
    const getMaterial = await materialService.getMaterial();
    return res.json(getMaterial);
  },
  getMaterialById: async (req, res, next) => {
    const materialService = new MaterialService();
    const { id } = req.params;
    const getMaterial = await materialService.getMaterialById(id);
    return res.json(getMaterial);
  },
  deleteMaterial: async (req, res, next) => {
    const materialService = new MaterialService();
    const { id } = req.params;
    console.log(id);
    const del = await materialService.deleteMaterial(id);
    return res.json(del);
  },
};
