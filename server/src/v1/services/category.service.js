const { PrismaClient } = require("@prisma/client");
const ApiRes = require("../utils/api-res");

const prisma = new PrismaClient();

class CategoryService {
  async createCategory(nameCate) {
    try {
      const extName = await prisma.category.findFirst({
        where: {
          name: nameCate,
        },
      });
      if (extName) {
        return new ApiRes(400, "failed", "Danh mục đã tồn tại", null);
      }

      const newCategory = await prisma.category.create({
        data: {
          name: nameCate,
        },
      });
      return new ApiRes(201, "Success", "Tạo danh mục thiết bị thành công", {
        category: {
          id: newCategory.id,
          name: newCategory.name,
        },
      });
    } catch (error) {
      console.log(error);
      return new ApiRes(
        500,
        "failed",
        "Tạo danh mục thiết bị không thành công",
        null
      );
    }
  }
  async getCategory() {
    return prisma.category.findMany({
      include: { Devices: true },
    });
  }
  async updateCategory(id, data) {
    return prisma.category.update({
      where: {
        id: Number(id),
      },
      data: {
        name: data,
      },
    });
  }
  async deleteCategory(id) {
    return prisma.category.delete({
      where: {
        id: Number(id),
      },
    });
  }
}

module.exports = CategoryService;
