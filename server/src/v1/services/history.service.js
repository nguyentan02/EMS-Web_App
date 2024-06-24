const { PrismaClient } = require("@prisma/client");
const ApiRes = require("../utils/api-res");
// const cron = require("node-cron");
const prisma = new PrismaClient();

class HistoryService {
  async getUsageHistory() {
    try {
      const devicesWithUsageHistory = await prisma.device.findMany({
        where: {
          UsageHistory: {
            some: {}, // Chỉ lấy những thiết bị có ít nhất một UsageHistory
          },
        },
        select: {
          id: true,
          name: true,
          model: true,
          serial_number: true,
          Category: true,
          UsageHistory: {
            include: {
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
        "Lấy dữ liệu thành công ",
        devicesWithUsageHistory
      );
    } catch (error) {
      console.error("Error retrieving usage history:", error);
      throw new Error("Could not retrieve usage history");
    }
  }
}
module.exports = HistoryService;
