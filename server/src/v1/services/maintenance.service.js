const { PrismaClient } = require("@prisma/client");
const ApiRes = require("../utils/api-res");
// const cron = require("node-cron");
const prisma = new PrismaClient();

class MaintenanceService {
  async createMaintenan(
    deviceId,
    date_start,
    date_end,
    employee_code,
    cost,
    description,
    materialItem
  ) {
    try {
      if (!materialItem || materialItem.length === 0) {
        return new ApiRes(
          400,
          "error",
          "Danh sách vật tư không được rỗng",
          null
        );
      }
      const newMainten = await prisma.$transaction(async (prisma) => {
        const createdMainten = await prisma.maintenance_History.create({
          data: {
            device: {
              connect: {
                id: deviceId,
              },
            },
            date_start: new Date(date_start),
            date_end: new Date(date_end),
            nhan_vien: {
              connect: {
                id: employee_code,
              },
            },
            cost: cost,
            description: description,
          },
        });

        for (const item of materialItem) {
          const { inventoryId, quantityMater } = item;
          const inventory = await prisma.inventory.findUnique({
            where: { id: inventoryId },
          });
          if (!inventory || inventory.quantity < quantityMater) {
            throw new Error("Vật liệu trong kho không đủ");
          }

          await prisma.inventory.update({
            where: { id: inventoryId },
            data: { quantity: inventory.quantity - quantityMater },
          });
          const newIn = await prisma.maintenanceInventory.create({
            data: {
              maintenanceHistoryId: createdMainten.id,
              inventoryId: inventoryId,
              quantityMater: quantityMater,
            },
          });
          await prisma.transaction.create({
            data: {
              materialId: inventory.materialId,
              quantity: quantityMater,
              transactionType: "Xuất",
              transactionDate: new Date(date_start),
              maintenanceInventoryId: newIn.id,
            },
          });
        }

        await prisma.device.update({
          where: { id: deviceId },
          data: {
            statusId: 4,
          },
        });
        return createdMainten;
      });
      return new ApiRes(
        201,
        "success",
        "Tạo kế hoạch bảo trì thành công",
        newMainten
      );
    } catch (error) {
      console.log(error);
      return new ApiRes(500, "failed", "Tạo kế hoạch không thành công", null);
    }
  }
  async updateStatus(data) {
    const {
      id,
      deviceId,
      employee_code,
      date_start,
      date_end,
      cost,
      statusId,
      description,
      materialItem,
    } = data;

    try {
      if (!materialItem || materialItem.length === 0) {
        return new ApiRes(
          400,
          "error",
          "Danh sách vật tư không được rỗng",
          null
        );
      }
      const updatedMainten = await prisma.$transaction(async (prisma) => {
        const update = await prisma.maintenance_History.update({
          where: {
            id: +id,
          },
          data: {
            deviceId: +deviceId,
            employee_code: +employee_code,
            date_start: new Date(date_start),
            date_end: new Date(date_end),
            cost: +cost,
            statusId: +statusId,
            description: description,
          },
        });

        const existingMaterialItems =
          await prisma.maintenanceInventory.findMany({
            where: { maintenanceHistoryId: +id },
            include: { transactions: true },
          });

        for (const item of materialItem) {
          const { inventoryId, quantityMater } = item;
          const existingItem = existingMaterialItems.find(
            (i) => i.inventoryId === inventoryId
          );
          const inventory = await prisma.inventory.findUnique({
            where: { id: inventoryId },
          });
          if (existingItem) {
            const quantityDifference =
              quantityMater - existingItem.quantityMater;

            if (quantityDifference > 0) {
              await prisma.maintenanceInventory.update({
                where: {
                  id: existingItem.id,
                },
                data: {
                  quantityMater:
                    existingItem.quantityMater + quantityDifference,
                },
              });

              await prisma.inventory.update({
                where: { id: inventoryId },
                data: { quantity: { decrement: quantityDifference } },
              });

              await prisma.transaction.update({
                where: { id: existingItem.transactions[0].id },
                data: {
                  quantity: existingItem.quantityMater + quantityDifference,
                  transactionType: "Xuất",
                },
              });
            } else if (quantityDifference < 0) {
              await prisma.maintenanceInventory.update({
                where: {
                  id: existingItem.id,
                },
                data: {
                  quantityMater: quantityMater,
                },
              });

              await prisma.inventory.update({
                where: { id: inventoryId },
                data: { quantity: { increment: -quantityDifference } },
              });

              await prisma.transaction.update({
                where: { id: existingItem.transactions[0].id },
                data: {
                  quantity: existingItem.quantityMater + quantityDifference,
                  transactionType: "Xuất",
                },
              });
            }
          } else {
            // Create new item
            const newItem = await prisma.maintenanceInventory.create({
              data: {
                maintenanceHistoryId: +id,
                inventoryId: inventoryId,
                quantityMater: quantityMater,
              },
            });

            await prisma.inventory.update({
              where: { id: inventoryId },
              data: { quantity: { decrement: quantityMater } },
            });
            // console.log(inventory);
            await prisma.transaction.create({
              data: {
                material: {
                  connect: { id: inventory.materialId },
                },
                quantity: quantityMater,
                transactionType: "Xuất",
                transactionDate: new Date(date_start),
                MaintenanceInventory: {
                  connect: { id: newItem.id },
                },
              },
            });
          }
        }

        await prisma.device.update({
          where: {
            id: +deviceId,
          },
          data: {
            statusId: 2,
          },
        });

        return update;
      });

      return new ApiRes(
        201,
        "success",
        "Cập nhật kế hoạch thành công",
        updatedMainten
      );
    } catch (error) {
      console.log(error);
      return new ApiRes(500, "error", "Cập nhật kế hoạch thất bại", error);
    }
  }
  async deleteMaintenance(id) {
    try {
      const maintenance = await prisma.maintenance_History.findUnique({
        where: { id: +id },
        include: { inventories: { include: { inventory: true } } },
      });
      if (maintenance.statusId !== 4) {
        return new ApiRes(
          400,
          "failed",
          "Không thể xoá kế hoạch đã hoàn thành ",
          null
        );
      }

      for (const item of maintenance.inventories) {
        await prisma.inventory.update({
          where: { id: item.inventoryId },
          data: { quantity: { increment: item.quantityMater } },
        });

        await prisma.transaction.create({
          data: {
            materialId: item.inventory.materialId,
            quantity: item.quantityMater,
            transactionType: "Hoàn lại",
            transactionDate: new Date(),
          },
        });
      }
      await prisma.maintenance_History.delete({
        where: { id: +id },
      });

      return new ApiRes(
        200,
        "success",
        "Xóa kế hoạch bảo trì thành công",
        null
      );
    } catch (error) {
      console.log(error);
      return new ApiRes(500, "error", "Xóa kế hoạch bảo trì thất bại", error);
    }
  }
  async deleteMaterialItem(id) {
    try {
      const materialItem = await prisma.maintenanceInventory.findUnique({
        where: { id: +id },
        include: {
          inventory: true,
        },
      });

      if (!materialItem) {
        throw new Error("Material item not found");
      }

      await prisma.inventory.update({
        where: { id: materialItem.inventoryId },
        data: {
          quantity:
            materialItem.inventory.quantity + materialItem.quantityMater,
        },
      });

      await prisma.maintenanceInventory.delete({
        where: { id: +id },
      });

      return new ApiRes(200, "success", "Xóa vật liệu thành công");
    } catch (error) {
      console.log(error);
      return new ApiRes(500, "error", "Xóa vật liệu thất bại", error);
    }
  }

  async getMaintenan() {
    try {
      const get = await prisma.maintenance_History.findMany({
        orderBy: { statusId: "desc" },
        include: {
          nhan_vien: true,
          Status: true,
          inventories: {
            include: { inventory: { include: { material: true } } },
          },
          device: { include: { Room: { include: { deparment: true } } } },
        },
      });
      return new ApiRes(201, "succes", "Truy xuất dữ liệu thành công", get);
    } catch (error) {
      console.log(error);
    }
  }

  async getInventoy() {
    const inventory = await prisma.inventory.findMany({
      include: {
        material: true,
      },
    });
    return new ApiRes(201, "success", "Passs", inventory);
  }
  async getStatus() {
    const status = await prisma.status.findMany({
      where: {
        id: {
          gte: 3,
          lte: 5,
        },
      },
      orderBy: {
        id: "asc",
      },
      include: {
        Maintenance_History: true,
      },
    });
    const result = [];
    status.forEach((e) => {
      result.push({ id: e.id, value: e.Maintenance_History.length });
    });

    return new ApiRes(201, "success", "Passs", result);
  }
}

module.exports = MaintenanceService;
