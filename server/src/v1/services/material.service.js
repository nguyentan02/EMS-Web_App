const { PrismaClient } = require("@prisma/client");
const ApiRes = require("../utils/api-res");
// const cron = require("node-cron");
const prisma = new PrismaClient();

class MeterialService {
  async newMaterial(name, description, imageUrl, unit) {
    try {
      const extMaterial = await prisma.material.findFirst({
        where: {
          name: name,
        },
      });
      if (extMaterial) {
        return new ApiRes(401, "failed", "Đã tồn tại vật tư", null);
      }
      const newMater = await prisma.material.create({
        data: {
          name: name,
          description: description,
          imageUrl: imageUrl,
          unit: unit,
        },
      });
      await prisma.inventory.create({
        data: {
          materialId: newMater.id,
          quantity: 0,
        },
      });
      return new ApiRes(201, "success", "Tạo vật liệu thành công ", newMater);
    } catch (error) {
      console.log(error);
      return new ApiRes(500, "failed", "Tạo vật tư không thành công", error);
    }
  }
  async updateMaterial(id, name, imageUrl, description, unit) {
    try {
      const updateMaterial = await prisma.material.update({
        where: { id: +id },
        data: {
          name: name,
          description: description,
          imageUrl: imageUrl,
          unit: unit,
        },
      });

      return new ApiRes(
        201,
        "success",
        "Cập nhật vật tư thành công ",
        updateMaterial
      );
    } catch (error) {
      console.log(error);
      return new ApiRes(
        500,
        "failed",
        "Cập nhật vật tư không thành công",
        error
      );
    }
  }
  async deleteMaterial(id) {
    const deleteMaterial = await prisma.material.update({
      where: { id: +id },
      data: {
        trash: true,
      },
    });
    return new ApiRes(201, "success", "Xoá vật tư thành công", deleteMaterial);
  }
  async getMaterial() {
    try {
      const getMaterial = await prisma.material.findMany({
        where: {
          trash: false,
        },
      });
      return new ApiRes(201, "success", "Lấy dữ liệu thành công", getMaterial);
    } catch (error) {}
  }
  async getMaterialById(id) {
    try {
      const getMaterial = await prisma.material.findMany({
        where: {
          id: +id,
        },
        include: {
          orderItems: {
            include: {
              material: true,
              order: true,
            },
          },
        },
      });
      return new ApiRes(201, "success", "Lấy dữ liệu thành công", getMaterial);
    } catch (error) {}
  }
}
module.exports = MeterialService;
