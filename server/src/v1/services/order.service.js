const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const ApiRes = require("../utils/api-res");
const { checkQuantity } = require("../controllers/order.controller");
// OrderService
class OrderService {
  async createOrder(dataOrder) {
    try {
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

      return order;
    } catch (error) {
      console.log(error);
    }
  }
  async getOrders() {
    return await prisma.order.findMany({
      orderBy: {
        orderDate: "asc",
      },
      include: {
        orderItems: {
          include: { material: true },
        },
      },
    });
  }

  async getOrderById(id) {
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
  }

  async updateOrder(id) {
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
  async checkInventoryLevels() {
    try {
      const materials = await prisma.material.findMany({
        include: {
          orderItems: true,
        },
      });
      const inventoryLevels = materials.map((material) => {
        const totalQuantity = material.orderItems.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        const totalPrice = material.orderItems.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0
        );
        return {
          materialId: material.id,
          name: material.name,
          imageUrl: material.imageUrl,
          unit: material.unit,
          totalQuantity: totalQuantity,
          totalPrice: totalPrice,
        };
      });
      return new ApiRes(
        201,
        "succes",
        "Lấy dữ liêu thành công",
        inventoryLevels
      );
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = { OrderService };
