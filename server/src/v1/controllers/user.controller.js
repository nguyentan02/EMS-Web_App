const UserService = require("../services/user.service");
const ApiError = require("../utils/api-error");
const ApiRes = require("../utils/api-res");
const jwt = require("jsonwebtoken");
module.exports = {
  registerUser: async (req, res, next) => {
    try {
      const userService = new UserService();
      const { username, password } = req.body;
      const result = await userService.register(username, password);
      return res.json(result);
    } catch (error) {
      return next(new ApiError(500, error.message));
    }
  },

  loginUser: async (req, res, next) => {
    const userService = new UserService();
    const { username, password } = req.body;
    const result = await userService.login(username, password);

    if (result.code === 200) {
      res.cookie("token", result.data.token, {
        httpOnly: false,
        maxAge: 24 * 60 * 60 * 1000,
      });
    }

    return res.json(result);
  },

  logoutUser: async (req, res, next) => {
    try {
      await res.clearCookie("token");
      res.json(new ApiRes(200, "success", "Đăng xuất thành công!"));
    } catch (error) {
      return next(new ApiError(500, error.message));
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const userService = new UserService();
      const { id } = req.params;

      const deleted = await userService.deleteUser(id);
      return res.json(deleted);
    } catch (error) {
      return next(new ApiError(500, error.message));
    }
  },
  getAllUsers: async (req, res, next) => {
    const userService = new UserService();
    const result = await userService.getAllUsers();
    return res.json(result);
  },
  unlockUsers: async (req, res, next) => {
    const userService = new UserService();
    const { id } = req.body;
    const updated = await userService.unLockUser(id);
    return res.json(updated);
  },
  lockUser: async (req, res, next) => {
    try {
      const userService = new UserService();
      const { id } = req.body;

      const updated = await userService.lockUser(id);
      return res.json(updated);
    } catch (error) {
      return next(new ApiError(500, error.message));
    }
  },
};
