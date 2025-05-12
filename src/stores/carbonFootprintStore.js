import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCarbonFootprintStore = defineStore('carbonFootprint', () => {
  const categoryFootprints = ref([]);

  const setCategoryFootprints = (newData) => {
    categoryFootprints.value = newData;
  };

  return { categoryFootprints, setCategoryFootprints };
});