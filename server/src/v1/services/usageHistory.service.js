const { PrismaClient } = require("@prisma/client");
const ApiRes = require("../utils/api-res");

const cron = require("node-cron");
const prisma = new PrismaClient();

class UsageHistory {
  async createUsing(deviceId, user, roomId, usage_start, usage_end, purpose) {
    try {
      if (!roomId) {
        return new ApiRes(
          401,
          "warning",
          "Vui lòng chọn phòng đặt thiết bị ",
          null
        );
      }
      const newUsing = await prisma.usageHistory.create({
        data: {
          Device: {
            connect: { id: deviceId }, // Connect the Device relation
          },
          // deviceId: deviceId,
          user: user,
          usage_start: new Date(usage_start),
          usage_end: new Date(usage_end),
          purpose: purpose,
        },
      });
      await prisma.device.update({
        where: {
          id: deviceId,
        },
        data: {
          roomId: roomId,
          statusId: 2,
        },
      });
      // await prisma.history.create({
      //   data: {
      //     usageId: newUsing.id,
      //   },
      // });
      return new ApiRes(
        201,
        "success",
        "Thiết bị đã được đưa vào sử dụng",
        newUsing
      );
    } catch (error) {
      console.log(error);
      return new ApiRes(500, "error", "Thêm mới không thành công", null);
    }
  }
  async updateUsing(idUsage, user, usage_start, usage_end, purpose) {
    try {
      const usage_end_date = new Date(usage_end);
      if (usage_end_date > new Date()) {
        const usageHistory = await prisma.usageHistory.findUnique({
          where: { id: idUsage },
          select: { deviceId: true },
        });
        if (!usageHistory) {
          return new ApiRes(
            404,
            "error",
            "Không tìm thấy bản ghi usageHistory",
            null
          );
        }

        await prisma.device.update({
          where: { id: usageHistory.deviceId },
          data: { statusId: 2 },
        });
      }

      const updateUsing = await prisma.usageHistory.update({
        where: {
          id: idUsage,
        },
        data: {
          user: user,
          usage_start: new Date(usage_start),
          usage_end: new Date(usage_end),
          purpose: purpose,
        },
      });

      return new ApiRes(201, "success", "Cập nhật thành công", updateUsing);
    } catch (error) {
      return new ApiRes(500, "error", "Cập nhật không thành công", error);
    }
  }
  async getAllUsing() {
    try {
      const getAll = await prisma.usageHistory.findMany({
        where: { isHidden: false },
        include: {
          Device: {
            select: {
              id: true,
              name: true,
              model: true,
              serial_number: true,
              Category: true,
              statusId: true,
              Room: { include: { deparment: true } },
            },
          },
        },
      });
      return new ApiRes(
        201,
        "success",
        "Các thiết bị đang được sử dụng",
        getAll
      );
    } catch (error) {
      console.log(error);
      return new ApiRes(500, "error", "Internal server error", error);
    }
  }
  async getAllUsingTrue() {
    try {
      const getAll = await prisma.usageHistory.findMany({
        include: {
          Device: {
            select: {
              name: true,
              serial_number: true,
              Category: true,
              statusId: true,
            },
          },
          Room: {
            include: {
              deparment: true,
            },
          },
        },
      });
      return new ApiRes(201, "success", "Các thiết bị đã được sử dụng", getAll);
    } catch (error) {
      return new ApiRes(500, "error", "Internal server error", error);
    }
  }
  async deleteUsing(id) {
    try {
      console.log(id);
      const extingUsage = await prisma.usageHistory.findFirst({
        where: {
          id: +id,
        },
        include: {
          Device: {
            select: {
              id: true,
            },
          },
        },
      });

      if (!extingUsage) {
        return new ApiRes(400, "failed", "Không tồn tại", null);
      }
      const deleteUsing = await prisma.usageHistory.update({
        where: {
          id: +id,
        },
        data: {
          isHidden: true,
          end: new Date(),
        },
      });
      await prisma.device.update({
        where: {
          id: extingUsage.Device.id,
        },
        data: {
          statusId: 1,
        },
      });
      return new ApiRes(201, "success", "Xoá thành công", deleteUsing);
    } catch (error) {
      console.log(error);
      return new ApiRes(500, "error", "Internal server error", null);
    }
  }
}

cron.schedule("*/5 * * * *", async function () {
  const currentTime = new Date();
  const req = await prisma.usageHistory.findMany({
    where: {
      usage_end: { lt: currentTime },
      Device: {
        statusId: 2,
      },
    },
  });
  if (req.length > 0) {
    await prisma.device.updateMany({
      where: {
        id: {
          in: req.map((device) => device.deviceId),
        },
      },
      data: {
        statusId: 6,
      },
    });
  }
  console.log(req);

  console.log("running a task every 15 seconds");
});
module.exports = UsageHistory;
