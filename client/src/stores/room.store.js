import { defineStore } from "pinia";
import roomService from "@/services/room.service";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const roomStore = defineStore("location", () => {
  const router = useRouter();
  const err = ref(null);
  const result = ref(null);

  const getRooms = async () => {
    err.value = null;

    try {
      let testr = await roomService.getRooms();
      const rooms = testr.map((res) => ({
        value: res.id,
        name: res.room_name,
      }));
      return rooms;
    } catch (error) {
      err.value = error.message;
    }
  };

  return { result, err, getRooms };
});
