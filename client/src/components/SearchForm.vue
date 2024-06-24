<script setup>
import { ref, watch } from "vue";
import { debounce } from "lodash-es"; // Make sure you have Lodash installed

const emit = defineEmits(["search"]);
const searchQuery = ref("");
const emitSearch = debounce((newQuery) => {
  emit("search", newQuery);
}, 300);
watch(searchQuery, emitSearch);
</script>

<template>
  <div class="py-3 px-4 items-center">
    <label for="" class="sr-only">Tìm kiếm</label>
    <div class="relative w-full">
      <input
        type="text"
        name=""
        v-model="searchQuery"
        placeholder="Tìm kiếm"
        class="bg-gray-50 border border-gray-300 rounded-md text-base p-2"
      />
    </div>
  </div>
</template>
