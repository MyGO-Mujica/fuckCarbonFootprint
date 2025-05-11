<template>
  <div>
    <carbon-footprint-calculator ref="calculatorRef" />
    <h2>碳足迹可视化</h2>
   <carbon-footprint-chart :chart-data="footprintData" />
  </div>
</template>

<script setup>
import CarbonFootprintCalculator from '@/components/CarbonFootprintCalculator/CarbonFootprintCalculator.vue';
import CarbonFootprintChart from '@/components/CarbonFootprintCalculator/CarbonFootprintChart.vue';
import { ref, computed } from 'vue';

const calculatorRef = ref(null);

const footprintData = computed(() => {
  if (calculatorRef.value) {
    return calculatorRef.value.categoryFootprints;
  }
  return [];
});
</script>