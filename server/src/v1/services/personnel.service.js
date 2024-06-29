const { PrismaClient } = require("@prisma/client");
const ApiRes = require("../utils/api-res");

// const cron = require("node-cron");
const prisma = new PrismaClient();

class Personnel {
  async getPersonnel() {
    try {
      const personnel = await prisma.nhan_vien.findMany({});
      return new ApiRes(201, "success", "Truy xuat thanh cong", personnel);
    } catch (error) {
      return new ApiRes(500, "failed", "f", error);
    }
  }
}

module.exports = Personnel;
