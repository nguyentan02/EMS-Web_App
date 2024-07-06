const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const ApiRes = require("../utils/api-res");
// OrderService
class OrderService {
  async createOrder(dataOrder) {
    try {
      if (
        !dataOrder ||
        !dataOrder.orderItems ||
        !Array.isArray(dataOrder.orderItems) ||
        dataOrder.orderItems.length === 0
      ) {
        return new ApiRes(
          400,
          "failed",
          "Dữ liệu đặt hàng không hợp lệ. Vui lòng cung cấp danh sách các mặt hàng."
        );
      }
      for (const item of dataOrder.orderItems) {
        if (
          !item.materialId ||
          !item.quantity ||
          item.quantity <= 0 ||
          !item.price ||
          item.price <= 0
        ) {
          return new ApiRes(
            400,
            "failed",
            "Thông tin chi tiết về mặt hàng không hợp lệ."
          );
        }
      }
      const order = await prisma.order.create({
        data: {
          status: "pending",
          orderItems: {
            create: dataOrder.orderItems.map((item) => ({
              material: { connect: { id: item.materialId } },
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: { orderItems: true },
      });

      return new ApiRes(201, "success", "Đặt hàng thành công", order);
    } catch (error) {
      return new ApiRes(500, "faile", "Đặt hàng không thành công", error);
    }
  }
  async getOrders() {
    return await prisma.order.findMany({
      orderBy: {
        orderDate: "desc",
      },
      include: {
        orderItems: {
          include: { material: true },
        },
      },
    });
  }

  async getOrderById(id) {
    try {
      const order = await prisma.order.findUnique({
        where: { id: +id },
        include: {
          orderItems: {
            include: { material: true },
          },
        },
      });
      const totalPrice = order.orderItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );

      return {
        ...order,
        totalPrice: totalPrice,
      };
    } catch (error) {}
  }

  async updateOrder(id) {
    await this.updateInventoryFromOrderItems();
    const extOrder = await prisma.order.findFirst({
      where: { id: +id },
      include: {
        orderItems: true,
      },
    });
    await prisma.transaction.create({
      data: {
        materialId: extOrder.orderItems[0].materialId,
        quantity: extOrder.orderItems[0].quantity,
        price: extOrder.orderItems[0].price,
        transactionType: "Nhập",
        transactionDate: new Date(),
      },
    });
    return await prisma.order.update({
      where: { id: +id },
      data: {
        status: "delivered",
        orderDateEnd: new Date(),
      },
      include: { orderItems: true },
    });
  }

  async deleteOrder(id) {
    return await prisma.order.delete({ where: { id } });
  }

  async updateInventoryFromOrderItems() {
    const materials = await prisma.material.findMany({
      where: {
        orderItems: { some: {} },
      },
      include: {
        inventory: true,
        orderItems: true,
      },
    });

    for (const material of materials) {
      if (material.orderItems) {
        const totalQuantity = material.orderItems.reduce(
          (acc, item) => acc + item.quantity,
          0
        );

        let inventoryId;
        if (material.inventory) {
          inventoryId = material.inventory.map((item) => item.id);
        }

        await prisma.inventory.upsert({
          where: { id: +inventoryId },
          update: { quantity: totalQuantity },
          create: {
            materialId: material.id,
            quantity: totalQuantity,
          },
        });
      }
    }
  }
  async checkInventoryLevels() {
    try {
      const Inventory = await prisma.inventory.findMany({
        where: {
          material: {
            trash: false,
          },
        },
        include: {
          material: true,
        },
      });
      const filteredInventory = Inventory.filter(
        (item) => item.quantity > 0 && !item.material.trash
      );

      console.log(filteredInventory);
      return new ApiRes(201, "succes", "Lấy dữ liêu thành công", Inventory);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = { OrderService };
