const CategoryService = require("../services/category.service");

const ApiRes = require("../utils/api-res");
const ApiError = require("../utils/api-error");

module.exports = {
  createdCategory: async (req, res, next) => {
    try {
      const categoryService = new CategoryService();
      const { nameCate } = req.body;
      const created = await categoryService.createCategory(nameCate);
      return res.json(created);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateCate: async (req, res, next) => {
    try {
      const categoryService = new CategoryService();
      const { id } = req.params;
      const { data } = req.body;
      console.log(id, data);
      const updated = await categoryService.updateCategory(id, data);
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getCate: async (req, res, next) => {
    try {
      const categoryService = new CategoryService();
      const getCate = await categoryService.getCategory();
      return res.json(getCate);
    } catch (error) {}
  },
  deleteCate: async (req, res, next) => {
    try {
      const categoryService = new CategoryService();
      const { id } = req.params;
      console.log(id);
      const deleted = await categoryService.deleteCategory(id);
      res.json(deleted);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
