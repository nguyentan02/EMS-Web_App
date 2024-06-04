const { PrismaClient } = require("@prisma/client");
const ApiRes = require("../utils/api-res");

const prisma = new PrismaClient();

class LocationService {
  async createDeparment(dpmname) {
    try {
      const extDpmname = await prisma.deparment.findFirst({
        where: {
          deparment_name: dpmname,
        },
      });
      if (extDpmname) {
        return new ApiRes(400, "failed", "Khoa đã tồn tại", null);
      }
      const newDep = await prisma.deparment.create({
        data: {
          deparment_name: dpmname,
        },
      });
      return new ApiRes(201, "Success", "Khoa được tạo thành công", {
        deparment: {
          id: newDep.id,
          deparment_name: newDep.deparment_name,
        },
      });
    } catch (error) {
      return new ApiRes(500, "failed", "Đăng kí khoa không thành công", null);
    }
  }

  async createRoom(roomname, id_dep) {
    const newRoom = await prisma.room.create({
      data: {
        room_name: roomname,
        deparment_id: id_dep,
      },
    });
    return new ApiRes(201, "Success", "Phong được tạo thành công", {
      room: {
        id: newRoom.id,
        room_name: newRoom.room_name,
        deparment_id: newRoom.deparment_id,
      },
    });
  }
  async updateDeparment(id, data) {
    try {
      const extDep = await prisma.deparment.findFirst({
        where: {
          id: id,
        },
      });
      if (!extDep) {
        return new ApiRes(400, "failed", "Không tìm thây deparment", null);
      }

      const updated = await prisma.deparment.update({
        where: { id: id },
        data: {
          deparment_name: data,
        },
      });
      return new ApiRes(201, "seccess", "Cập nhật thành công", {
        deparment: {
          id: id,
          deparment_name: updated.deparment_name,
        },
      });
    } catch (error) {}
  }
  async getDeparments() {
    return prisma.deparment.findMany({
      include: {
        rooms: true,
      },
    });
  }

  async getRooms() {
    return prisma.room.findMany({
      include: {
        deparment: true,
      },
    });
  }
}
module.exports = LocationService;
