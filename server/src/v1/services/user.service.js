const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const ApiRes = require("../utils/api-res");
const cron = require("node-cron");
const prisma = new PrismaClient();

class UserService {
  async register(username, password) {
    try {
      const existingUser = await prisma.user.findFirst({
        where: {
          username: username,
        },
      });

      if (existingUser) {
        return new ApiRes(400, "failed", "Username is already taken", null);
      }

      const hashPassword = await bcrypt.hash(password, 10);

      //Create user
      const newUser = await prisma.user.create({
        data: {
          username: username,
          password: hashPassword,
          status: "active",
          failedAttempts: 0,
          role: "user",
        },
      });

      return new ApiRes(201, "success", "User registered successfully", {
        user: {
          id: newUser.id,
          username: newUser.username,
          role: newUser.role,
        },
      });
    } catch (error) {
      console.error(error);
      return new ApiRes(500, "failed", "User registration failed", null);
    }
  }

  async login(username, password) {
    try {
      const res = await prisma.user.findFirst({
        where: {
          username: username,
        },
      });
      if (!res) {
        return new ApiRes(404, "failed", "User not found", null);
      }
      if (res.status === "locked") {
        return new ApiRes(
          403,
          "failed",
          `Account is locked due to multiple failed login attempts ${new Date(res.lockTo).toLocaleString()}`,
          null
        );
      }
      const match = await bcrypt.compare(password, res.password);
      if (!match) {
        await prisma.user.update({
          where: { id: res.id },
          data: { failedAttempts: { increment: 1 } },
        });

        if (res.failedAttempts + 1 >= 5) {
          const currentDate = new Date();
          const lockToDate = new Date(currentDate);
          lockToDate.setDate(currentDate.getDate() + 1);
          await prisma.user.update({
            where: { id: res.id },
            data: {
              status: "locked",
              lockTo: lockToDate,
            },
          });
          return new ApiRes(
            403,
            "failed",
            `Account is locked due to multiple failed login attempt`,
            null
          );
        }

        return new ApiRes(400, "failed", "Invalid password", null);
      }
      await prisma.user.update({
        where: { id: res.id },
        data: {
          failedAttempts: 0,
          status: "active",
        },
      });

      // await prisma.activeToken.deleteMany({
      //   where: {
      //     userId: res.id,
      //   },
      // });

      const token = jwt.sign({ id: res.id, username: res.username }, "sdk143", {
        expiresIn: "1d",
      });

      // await prisma.activeToken.create({
      //   data: {
      //     userId: res.id,
      //     token: token,
      //   },
      // });
      delete res.password;
      return new ApiRes(200, "success", "Login successful", {
        token,
        user: res,
      });
    } catch (error) {
      console.error(error);
      return { success: false, message: "Authentication failed" };
    }
  }

  //Logout
  // async logout(token) {
  //   try {
  //     const decoded = jwt.verify(token, "sdk143");
  //     console.log(decoded);
  //     await prisma.activeToken.deleteMany({
  //       where: {
  //         userId: decoded.id,
  //         token: token,
  //       },
  //     });
  //     return new ApiRes(200, "success", "Logout successful", null);
  //   } catch (error) {
  //     console.error(error);
  //     return new ApiRes(500, "failed", "Logout failed", null);
  //   }
  // }

  // get allUser

  async getAllUsers() {
    try {
      const users = await prisma.user.findMany({
        where: {
          role: "user",
        },
      });
      return new ApiRes(200, "success", "Users retrieved successfully", users);
    } catch (error) {
      console.error(error);
      return new ApiRes(500, "failed", "Failed to retrieve users", null);
    }
  }
  async unLockUser(id) {
    const currentDate = new Date();
    const lockToDate = new Date(currentDate);
    lockToDate.setDate(currentDate.getDate() + 1);
    try {
      const user = await prisma.user.update({
        where: {
          id: id,
          status: "locked",
        },
        data: {
          status: "active",
          failedAttempts: 0,
          lockTo: lockToDate,
        },
      });
      return new ApiRes(200, "succes", "Unlock successfully", null);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async lockUser(id) {
    try {
      const user = await prisma.user.update({
        where: {
          id: id,
          status: "active",
        },

        data: {
          status: "locked",
          failedAttempts: 5,
          lockTo: null,
        },
      });
      return new ApiRes(200, "succes", "Lock successfully", null);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

module.exports = UserService;
