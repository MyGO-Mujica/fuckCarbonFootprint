<template>
  <div ref="chartContainer" :style="{ width: '100%', height: '300px' }"></div>
</template>

<script setup>
import { ref, onUnmounted, onMounted } from 'vue'
import * as echarts from 'echarts'

const chartContainer = ref(null)
let chartInstance = null

// 从 localStorage 读取并转换为柱状图需要的数据格式
function getBarChartDataFromLocal() {
  const storedItems = localStorage.getItem('carbonFootprintItems')
  if (!storedItems) return []
  const parsedItems = JSON.parse(storedItems)
  // 按 consumableType 分类汇总
  const map = new Map()
  parsedItems.forEach(itemData => {
    const { category, carbonFootprint } = itemData.item
    const value = carbonFootprint * itemData.quantity
    if (!map.has(category)) map.set(category, 0)
    map.set(category, map.get(category) + value)
  })
  // 转为 ECharts 需要的格式
  return Array.from(map.entries()).map(([name, value]) => ({
    name,
    value: Number(value.toFixed(2))
  }))
}

const updateChart = () => {
  if (chartContainer.value) {
    if (!chartInstance) {
      chartInstance = echarts.init(chartContainer.value)
    }
    const chartData = getBarChartDataFromLocal()
    const option = {
      title: {
        text: '碳足迹占比（柱图）',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
      },
      xAxis: {
        type: 'category',
        data: chartData.map(item => item.name),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '碳足迹',
          type: 'bar',
          data: chartData.map(item => item.value),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    }
    chartInstance.setOption(option)
  }
}

onMounted(() => {
  updateChart()
  // 监听 storage 事件，支持多标签页同步
  window.addEventListener('storage', updateChart)
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose()
  }
  window.removeEventListener('storage', updateChart)
})
</script>
