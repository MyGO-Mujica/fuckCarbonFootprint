<template>
  <div ref="chartContainer" :style="{ width: '100%', height: '300px' }"></div>
</template>

<script setup>
import { ref, onUnmounted,  onMounted } from 'vue'
import * as echarts from 'echarts'

const chartContainer = ref(null)
let chartInstance = null

// 处理从 localStorage 读取并转换数据为饼图格式
const getChartDataFromLocal = () => {
  const storedItems = localStorage.getItem('carbonFootprintItems')
  if (!storedItems) return []

  try {
    const parsedItems = JSON.parse(storedItems)

    // 按类别累计碳足迹
    const footprints = {}
    parsedItems.forEach(({ item, quantity }) => {
      if (!footprints[item.category]) footprints[item.category] = 0
      footprints[item.category] += item.carbonFootprint * quantity
    })

    // 转换为饼图需要的数组格式
    return Object.entries(footprints).map(([name, value]) => ({
      name,
      value: Number(value.toFixed(2)),
    }))
  } catch (e) {
    ElMessage.error('解析本地碳足迹数据失败', e)
    return []
  }
}

const updateChart = () => {
  if (chartContainer.value) {
    if (!chartInstance) {
      chartInstance = echarts.init(chartContainer.value)
    }

    const rawData = getChartDataFromLocal()
    console.log('从localStorage读取并转换的饼图数据:', rawData)

    const option = {
      title: {
        text: '碳足迹占比（饼图）',
        left: 'center',
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
          avoidLabelOverlap: false,
          minAngle: 5,
          data: rawData,
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

// 页面加载和 localStorage 变化时刷新图表
onMounted(() => {
  updateChart()
})

// 监听 storage 事件（跨页面修改 localStorage）
window.addEventListener('storage', (event) => {
  if (event.key === 'carbonFootprintItems') {
    updateChart()
  }
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose()
  }
  window.removeEventListener('storage', updateChart)
})
</script>
