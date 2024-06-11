const { PrismaClient } = require("@prisma/client");
const ApiRes = require("../utils/api-res");
const cron = require("node-cron");
const prisma = new PrismaClient();

class UsageHistory {
  async createUsing(deviceId, user, roomId, usage_start, usage_end, purpose) {
    try {
      const extingDevice = await prisma.usageHistory.findFirst({
        where: {
          deviceId: deviceId,
        },
      });
      if (extingDevice) {
        return new ApiRes(400, "failed", "Thiết bị đã được sử dụng ", null);
      }
      // const durationInSeconds = Math.round(
      //   (new Date(usage_end) - new Date(usage_start)) / 1000
      // );
      // console.log(durationInSeconds);

      const newUsing = await prisma.usageHistory.create({
        data: {
          Device: {
            connect: { id: deviceId }, // Connect the Device relation
          },
          // deviceId: deviceId,
          user: user,
          roomId: roomId,
          usage_start: new Date(usage_start),
          usage_end: new Date(usage_end),
          purpose: purpose,
        },
      });

      await prisma.device.update({
        where: { id: deviceId },
        data: { statusId: 2, roomId: roomId },
      });
      return new ApiRes(
        201,
        "success",
        "Thiết bị đã được đưa vào sử dụng",
        newUsing
      );
    } catch (error) {
      console.log(error);
    }
  }
  async updateUsing(idUsage, user, usage_start, usage_end, purpose) {
    try {
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
      console.log(error);
    }
  }
  async getAllUsing() {
    try {
      const getAll = await prisma.usageHistory.findMany({
        include: {
          Device: {
            select: {
              name: true,
              serial_number: true,
              Category: true,
              statusId: true,
              Room: {
                include: {
                  deparment: true,
                },
              },
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
      return new ApiRes(500, "error", "Internal server error", null);
    }
  }
  async deleteUsing(id) {
    try {
      console.log(id);
      const extingUsage = await prisma.usageHistory.findFirst({
        where: {
          id: +id,
        },
      });
      if (!extingUsage) {
        return new ApiRes(400, "failed", "Không tồn tại", null);
      }
      const deleteUsing = await prisma.usageHistory.delete({
        where: {
          id: +id,
        },
      });
      await prisma.device.update({
        where: {
          id: +id,
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
        NOT: {
          statusId: 3,
        },
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
        statusId: 3,
      },
    });
  }
  console.log(req);

  console.log("running a task every 15 seconds");
});
module.exports = UsageHistory;
