<template>
  <div>
    <carbon-footprint-chart :chart-data="footprintData" v-if="footprintData.length > 0" />
       <carbon-footprint-bar-chart :chart-data="footprintData" v-if="footprintData.length > 0" />
    <p v-else>暂无碳足迹数据。</p>
  </div>
</template>

<script setup>
import CarbonFootprintChart from '@/components/CarbonFootprintCalculator/CarbonFootprintChart.vue';
import { computed,watch } from 'vue';
import { useCarbonFootprintStore } from '@/stores/carbonFootprintStore';

const store = useCarbonFootprintStore();
const footprintData = computed(() => store.categoryFootprints);
watch(footprintData, (newValue) => {
  console.log('footprintData in ArticleManage changed:', newValue);
}, { deep: true });

</script>