const { PrismaClient } = require("@prisma/client");
const ApiRes = require("../utils/api-res");

const prisma = new PrismaClient();
class Transaction {
  async getTransaction(materialId) {
    try {
      const transactions = await prisma.transaction.findMany({
        where: {
          materialId: +materialId,
        },
        select: {
          material: true,
          transactionType: true,
          transactionDate: true,
          quantity: true,
          price: true,
        },
      });
      return new ApiRes(
        200,
        "success",
        "Lấy giao dịch thành công",
        transactions
      );
    } catch (error) {
      console.log(error);
      return new ApiRes(500, "error", "Lấy giao dịch thất bại", error);
    }
  }
  async getAllTransactionQuantities() {
    try {
      const transactions = await prisma.transaction.findMany({
        select: {
          materialId: true,
          transactionType: true,
          quantity: true,
          material: {
            select: {
              name: true,
            },
          },
        },
      });

      const totalQuantities = transactions.reduce((acc, transaction) => {
        const { materialId, transactionType, quantity, material } = transaction;

        if (!acc[materialId]) {
          acc[materialId] = { name: material.name, nhap: 0, xuat: 0 };
        }

        if (transactionType === "Nhập") {
          acc[materialId].nhap += quantity;
        } else if (transactionType === "Xuất") {
          acc[materialId].xuat += quantity;
        }

        return acc;
      }, {});
      const totalQuantitiesArray = Object.values(totalQuantities);
      return new ApiRes(
        201,
        "success",
        "Truy van thanh cong ",
        totalQuantitiesArray
      );
    } catch (error) {
      console.error("Error fetching transaction quantities:", error);
      return {
        status: "error",
        message: "Failed to fetch transaction quantities",
        error: error,
      };
    }
  }
}

module.exports = Transaction;
