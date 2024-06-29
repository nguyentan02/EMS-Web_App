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
    category_id
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
          statusId: Number(1),
          categoryId: category_id,
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
    category_id
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
        },
      });

      return new ApiRes(201, "success", "Cập nhật thiết bị thành công ", {
        device: updateDevice,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async deleteDevice(id) {
    try {
      const deviceActive = await prisma.device.findFirst({
        where: { id: +id },
      });
      if (deviceActive.statusId !== 1) {
        return new ApiRes(
          401,
          "failed",
          "Thiết bị đang hoạt động không thể xoá",
          null
        );
      }

      const deleteDevice = await prisma.device.delete({
        where: {
          id: +id,
        },
      });
      return new ApiRes(
        201,
        "success",
        "Xoá thiết bị thành công",
        deleteDevice
      );
    } catch (error) {
      console.log(error);
      return new ApiRes(500, "failed", "Không thể xoá", error);
    }
  }
  async getAllDevice() {
    try {
      const devices = await prisma.device.findMany({
        orderBy: {
          purchase_date: "asc",
        },
        include: {
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
  async getAllDeviceNoActive() {
    try {
      const devices = await prisma.device.findMany({
        where: {
          statusId: 1,
        },
        orderBy: {
          purchase_date: "asc",
        },
        include: {
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

  async transferDevice(id, deviceId, locationId) {
    try {
      const extRoom = await prisma.device.findUnique({
        where: { id: deviceId },
        select: { roomId: true },
      });
      if (extRoom.roomId == locationId) {
        return new ApiRes(
          400,
          "warning",
          "Thiết bị hiện đang ở phòng này",
          null
        );
      }
      const oldLocationId = extRoom.roomId;

      const transferData = await prisma.device.update({
        where: { id: deviceId },
        data: {
          roomId: locationId,
        },
      });

      await this.createHistory(deviceId, oldLocationId, locationId);

      return new ApiRes(
        201,
        "success",
        "Luân chuyển thiết bị thành công",
        transferData
      );
    } catch (error) {
      console.log(error);
      return new ApiRes(500, "failed", "Đã xảy ra lỗi", error);
    }
  }
  async createHistory(deviceId, oldLocationId, newLocationId) {
    try {
      await prisma.historyTransfer.create({
        data: {
          deviceId: deviceId,
          oldLocationId: oldLocationId,
          newLocationId: newLocationId,
          transferDate: new Date(),
        },
      });
    } catch (error) {
      console.error("Failed to create history:", error);
    }
  }
  async getHistoryTransfer() {
    try {
      const history = await prisma.device.findMany({
        where: {
          HistoryTransfer: {
            some: {},
          },
        },
        select: {
          id: true,
          name: true,
          model: true,
          serial_number: true,
          Category: true,
          HistoryTransfer: {
            include: {
              OldRoom: {
                include: {
                  deparment: true,
                },
              },
              NewRoom: {
                include: {
                  deparment: true,
                },
              },
            },
          },
        },
      });
      return new ApiRes(201, "success", "Truy vấn lịch sử thành công", history);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = DeviceService;
