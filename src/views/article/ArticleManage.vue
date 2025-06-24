<template>
  <div>
    <carbon-footprint-chart :chart-data="footprintData" v-if="footprintData.length > 0" />
    <carbon-footprint-bar-chart :chart-data="footprintData" v-if="footprintData.length > 0" />
    <p v-else>暂无碳足迹数据。</p>
  </div>
<div class="total-container">
  <div class="total-text">碳足迹总量：{{ totalCarbonFootprint.toFixed(2) }} kg CO₂</div>
  <el-button type="primary" size="medium" @click="handleSubmit">
    提交碳足迹数据
  </el-button>
</div>
</template>

<script setup>
import CarbonFootprintChart from '@/components/CarbonFootprintCalculator/CarbonFootprintChart.vue'
import { computed, watch, ref, onMounted } from 'vue'
import { useCarbonFootprintStore } from '@/stores/carbonFootprintStore'

const store = useCarbonFootprintStore()
const footprintData = computed(() => store.categoryFootprints)
watch(
  footprintData,
  (newValue) => {
    console.log('footprintData in ArticleManage changed:', newValue)
  },
  { deep: true },
)

const itemsToCalculate = ref([])

// 页面挂载时从 localStorage 加载数据
onMounted(() => {
  const storedItems = localStorage.getItem('carbonFootprintItems')
  if (storedItems) {
    itemsToCalculate.value = JSON.parse(storedItems)
  }
})

// 计算碳足迹总量
const totalCarbonFootprint = computed(() => {
  return itemsToCalculate.value.reduce((total, itemData) => {
    return total + itemData.item.carbonFootprint * itemData.quantity
  }, 0)
})
function transformToUploadData() {
  const storedItems = localStorage.getItem('carbonFootprintItems')
  if (!storedItems) return []

  const parsedItems = JSON.parse(storedItems)

  return parsedItems.map((itemData) => {
    const item = itemData.item // 或者是你改名后的 product、record 等
    return {
      consumableName: item.item,
      consumableType: item.category,
      CO2Emissions: (item.carbonFootprint * itemData.quantity).toFixed(2),
    }
  })
}
const handleSubmit = () => {
  const uploadData = transformToUploadData()
  console.log(uploadData) // 后续可用 axios 或 fetch 上传
}
</script>
<style scoped>
.total-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
  background-color: #f0f8ff;
  padding: 16px 24px;
  margin-top: 20px;
  border-left: 6px solid #2ecc71;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.total-text {
  font-size: 20px;
  font-weight: 600;
  color: #2f4f4f;
  letter-spacing: 1px;
}
</style>
