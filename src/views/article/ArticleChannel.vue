<template>
  <div>
    <carbon-footprint-calculator ref="calculatorRef" />
  </div>
</template>

<script setup>
import CarbonFootprintCalculator from '@/components/CarbonFootprintCalculator/CarbonFootprintCalculator.vue';
import { useCarbonFootprintStore } from '@/stores/carbonFootprintStore';
import { onMounted, watch, ref } from 'vue';

const calculatorRef = ref(null);
const store = useCarbonFootprintStore();

onMounted(() => {
  // 确保 calculatorRef 在组件挂载后可用
  watch(() => calculatorRef.value?.categoryFootprints, (newFootprints) => {
    if (newFootprints) {
      store.setCategoryFootprints(newFootprints);
      console.log('Calculated and stored footprint data in ArticleChannel:', newFootprints);
    }
  }, { deep: true });
});
</script>