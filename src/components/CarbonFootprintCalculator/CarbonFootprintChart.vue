<template>
  <div ref="chartContainer" :style="{ width: '100%', height: '300px' }"></div>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue';
import * as echarts from 'echarts';

const chartContainer = ref(null);
let chartInstance = null;

const props = defineProps({
  chartData: {
    type: Array,
    required: true,
  },
});

const updateChart = () => {
  if (chartContainer.value) {
    if (!chartInstance) {
      chartInstance = echarts.init(chartContainer.value);
    }

    const option = {
      title: {
        text: '各方面碳足迹占比',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      series: [
        {
          name: '碳足迹',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: props.chartData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };

    chartInstance.setOption(option);
  }
};

watch(() => props.chartData, () => {
  updateChart();
}, { deep: true, immediate: true });

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose();
  }
});
</script>