<template>
  <div ref="chartContainer" :style="{ width: '100%', height: '300px' }"></div>
</template>

<script setup>
import { ref, onUnmounted, watch,nextTick } from 'vue';
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
        text: '碳足迹占比（柱图）',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }, // 柱形图的轴指针
      },
      xAxis: {
        type: 'category',
        data: props.chartData.map(item => item.name), // x 轴使用类别（衣、食、住、行）
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '碳足迹',
          type: 'bar',
          data: props.chartData.map(item => item.value),
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

    console.log('ECharts option being set:', option);
    chartInstance.setOption(option);
  }
};

watch(() => props.chartData, () => {
  nextTick(() => {
    updateChart();
  });
}, { deep: true, immediate: true });

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose();
  }
});
</script>
