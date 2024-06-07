const { PrismaClient } = require("@prisma/client");
const ApiRes = require("../utils/api-res");

const prisma = new PrismaClient();

class DeviceService {
  async createDevice(
    name,
    model,
    serial,
    manufac,
    purchase,
    price,
    status_id,
    category_id,
    location_id
  ) {
    try {
      const extSerial = await prisma.device.findFirst({
        where: {
          serial_number: serial,
        },
      });
      if (extSerial) {
        return new ApiRes(400, "failed", "Số serial đã tồn tại", null);
      }

      const newDevice = await prisma.device.create({
        data: {
          name: name,
          model: model,
          serial_number: serial,
          manufacturer: manufac,
          purchase_date: new Date(purchase),
          price: +price,
          status_id: status_id,
          categoryId: category_id,
          //   qr_code: qr_code,
          roomId: location_id,
        },
      });
      return new ApiRes(201, "success", "Tạo thiết bị thành công", {
        device: newDevice,
      });
    } catch (error) {
      console.log(error);
      return new ApiRes(500, "failed", "Tạo thiết bị không thành công", null);
    }
  }
  async updateDevice(
    id,
    name,
    model,
    serial,
    manufac,
    purchase,
    price,
    status_id,
    category_id,
    location_id
  ) {
    try {
      const device = await prisma.device.findUnique({
        where: { id: id },
      });
      if (!device) {
        return new ApiRes(404, "failed", "Thiết bị không tồn tại", null);
      }
      if (serial && serial !== device.serial_number) {
        const extSerial = await prisma.device.findFirst({
          where: { serial_number: serial },
        });
        if (extSerial) {
          return new ApiRes(400, "failed", "Số serial đã tồn tại", null);
        }
      }

      const updateDevice = await prisma.device.update({
        where: {
          id: id,
        },
        data: {
          name: name,
          model: model,
          serial_number: serial,
          manufacturer: manufac,
          purchase_date: new Date(purchase),
          // purchase_date: dateObject,
          price: +price,
          status_id: status_id,
          categoryId: category_id,
          //   qr_code: qr_code,
          roomId: location_id,
        },
      });

      return new ApiRes(201, "success", "Cập nhật thiết bị thành công ", {
        device: updateDevice,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllDevice() {
    try {
      const devices = await prisma.device.findMany({
        orderBy: {
          purchase_date: "asc",
        },
        include: {
          Room: {
            include: {
              deparment: true,
            },
          },
          Category: true,
        },
      });

      return new ApiRes(
        200,
        "success",
        "Devices retrieved successfully",
        devices
      );
    } catch (error) {
      console.log(error);
    }
  }

  async transferDevice(id, locationId) {
    try {
      const transferData = await prisma.device.update({
        where: { id: id },
        data: {
          roomId: locationId,
        },
      });
      return new ApiRes(
        201,
        "success",
        "Luân chuyển thiết bị thành công",
        transferData
      );
    } catch (error) {
      return new ApiRes(500, "failed", "Đã xảy ra lỗi", error);
    }
  }
}

module.exports = DeviceService;
