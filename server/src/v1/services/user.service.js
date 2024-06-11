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
      const newUser = await prisma.user.create({
        data: {
          username: username,
          password: hashPassword,
          status: "active",
          failedAttempts: 0,
          role: "user",
        },
      });
      return new ApiRes(201, "success", "Tạo tài khoản thành công", {
        user: {
          newUser,
        },
      });
    } catch (error) {
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
          `Tài khoản của bạn bị khoá đến ${new Date(res.lockTo).toLocaleString()}`,
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
            `Tài khoản bị khóa do đăng nhập nhiều lần không thành công`,
            null
          );
        }

        return new ApiRes(400, "failed", "Sai mật khẩu", null);
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
        orderBy: {
          createdAt: "asc",
        },
      });
      return new ApiRes(200, "success", "Users retrieved successfully", users);
    } catch (error) {
      console.error(error);
      return new ApiRes(500, "failed", "Failed to retrieve users", null);
    }
  }
  async deleteUser(id) {
    try {
      const user = await prisma.user.delete({
        where: {
          id: Number(id),
        },
      });
      return new ApiRes(200, "success", "Delete successfully", null);
    } catch (error) {
      console.log(error);
      return new ApiRes(500, "failed", "Failed to delete user", null);
    }
  }
  async unLockUser(id) {
    try {
      const user = await prisma.user.update({
        where: {
          id: id,
          status: "locked",
        },
        data: {
          status: "active",
          failedAttempts: 0,
          lockTo: null,
        },
      });
      return new ApiRes(200, "succes", "Unlock successfully", user);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async lockUser(id) {
    const currentDate = new Date();
    const lockToDate = new Date(currentDate);
    lockToDate.setDate(currentDate.getDate() + 1);
    try {
      const user = await prisma.user.update({
        where: {
          id: +id,
          status: "active",
        },
        data: {
          status: "locked",
          failedAttempts: 5,
          lockTo: lockToDate,
        },
      });
      return new ApiRes(200, "succes", "Lock successfully", user);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
cron.schedule("*/5 * * * *", async function () {
  const currentTime = new Date();
  const req = await prisma.user.findMany({
    where: {
      lockTo: { lt: currentTime },
    },
  });
  if (req.length > 0) {
    await prisma.user.updateMany({
      where: {
        id: {
          in: req.map((user) => user.id),
        },
      },
      data: {
        status: "active",
        failedAttempts: 0,
        lockTo: null,
      },
    });
  }
  console.log(req);
  console.log("running a task every 5 min");
});
module.exports = UserService;
