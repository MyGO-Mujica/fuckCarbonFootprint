<script setup>
import { ref, onMounted } from 'vue'
import { getCarbonFootprintLogs, deleteCarbonFootprintLog } from '@/api/user'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ArrowDown, ArrowRight } from '@element-plus/icons-vue'

const groupedRecords = ref([]) // 分组后的数据
const expandedGroups = ref([]) // 控制展开的组

// 按提交时间（精确到秒）分组
function groupByTime(records) {
  const map = new Map()
  records.forEach(item => {
    // 只取到秒，避免毫秒差异
    const timeKey = item.createTime.slice(0, 19)
    if (!map.has(timeKey)) map.set(timeKey, [])
    map.get(timeKey).push(item)
  })
  // 返回 [{time, total, list:[]}]
  return Array.from(map.entries()).map(([time, list]) => ({
    time,
    total: list.reduce((sum, i) => sum + Number(i.co2Emissions), 0),
    list
  })).sort((a, b) => b.time.localeCompare(a.time))
}

const fetchRecords = async () => {
  const res = await getCarbonFootprintLogs()
  // 兼容你的接口格式
  if (res.data.code === 0 && Array.isArray(res.data.data)) {
    groupedRecords.value = groupByTime(res.data.data)
  } else {
    groupedRecords.value = []
  }
}

const handleDelete = async (id, groupTime) => {
  try {
    await ElMessageBox.confirm('确定要删除这条碳足迹记录吗？', '提示', {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning',
    })
    const res = await deleteCarbonFootprintLog(id)
    if (res.data.code === 0) {
      ElMessage.success('删除成功')
      fetchRecords()
      // 删除后如果该组被删空，自动收起
      setTimeout(() => {
        const group = groupedRecords.value.find(g => g.time === groupTime)
        if (!group || group.list.length === 0) {
          expandedGroups.value = expandedGroups.value.filter(t => t !== groupTime)
        }
      }, 300)
    } else {
      ElMessage.error(res.data.message || '删除失败')
    }
  } catch (err) {
    ElMessage.error('删除失败', err.message || '请稍后再试')
  }
}
const handleDeleteGroup = async (group) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除该组下的所有碳足迹记录吗？（共${group.list.length}条）`,
      '提示',
      {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
    // 并发删除所有
    await Promise.all(group.list.map(item => deleteCarbonFootprintLog(item.id)))
    ElMessage.success('该组已全部删除')
    fetchRecords()
    // 自动收起
    expandedGroups.value = expandedGroups.value.filter(t => t !== group.time)
  } catch (err) {
    // 用户取消或出错
    if (err.name !== 'ElMessageBoxCancel') {
      ElMessage.error('删除失败，请稍后再试')
    }
  }
}

const toggleGroup = (time) => {
  if (expandedGroups.value.includes(time)) {
    expandedGroups.value = expandedGroups.value.filter(t => t !== time)
  } else {
    expandedGroups.value.push(time)
  }
}

onMounted(fetchRecords)
</script>

<template>
  <div class="records-container">
    <h1>历史碳足迹记录</h1>
    <div v-if="groupedRecords.length === 0" class="empty-tip">
      暂无碳足迹记录，快去记录你的环保行为吧！
    </div>
    <div v-else>
      <div
        v-for="group in groupedRecords"
        :key="group.time"
        class="record-group"
      >
<div class="group-header" @click="toggleGroup(group.time)">
  <span>
    <el-icon style="margin-right:8px;">
      <component :is="expandedGroups.includes(group.time) ? ArrowDown : ArrowRight" />
    </el-icon>
    {{ new Date(group.time).toLocaleString() }}
  </span>
  <span class="group-total">
    本次总碳排放：<b>{{ group.total.toFixed(2) }}</b> kg CO₂
    <el-button
      type="danger"
      size="small"
      style="margin-left: 16px"
      @click.stop="handleDeleteGroup(group)"
    >删除本组</el-button>
  </span>
</div>
        <div v-show="expandedGroups.includes(group.time)" class="group-detail">
          <div
            v-for="item in group.list"
            :key="item.id"
            class="record-card"
          >
            <div class="record-header">
              <span class="consumable-name">{{ item.consumableName }}</span>
              <span class="consumable-type">{{ item.consumableType }}</span>
            </div>
            <div class="co2">
              <span>碳排放：</span>
              <span class="co2-num">{{ item.co2Emissions }}</span>
              <span>kg CO₂</span>
            </div>
            <div class="record-time">
              <span>记录时间：</span>
              <span>{{ new Date(item.createTime).toLocaleString() }}</span>
            </div>
            <el-button
              type="danger"
              size="small"
              style="margin-top: 10px"
              @click.stop="handleDelete(item.id, group.time)"
            >删除</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.records-container {
  max-width: 700px;
  margin: 32px auto;
  padding: 24px;
  background: #eafaf1;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(34, 139, 34, 0.08);
}
h1 {
  text-align: center;
  color: #2e7d32;
  margin-bottom: 24px;
  letter-spacing: 2px;
}
.empty-tip {
  text-align: center;
  color: #aaa;
  font-size: 18px;
  padding: 40px 0;
}
.record-group {
  margin-bottom: 18px;
  border-radius: 10px;
  background: #f4fff7;
  box-shadow: 0 1px 4px rgba(34, 139, 34, 0.06);
  overflow: hidden;
}
.group-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #d0f5e8;
  padding: 12px 20px;
  font-size: 17px;
  font-weight: bold;
  color: #388e3c;
  cursor: pointer;
  user-select: none;
  border-bottom: 1px solid #c8e6c9;
}
.group-total {
  color: #388e3c;
  font-size: 15px;
}
.group-detail {
  padding: 12px 20px 12px 20px;
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: flex-start;
}
.record-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(34, 139, 34, 0.08);
  padding: 16px 18px;
  min-width: 220px;
  max-width: 260px;
  flex: 1 1 220px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-left: 6px solid #43a047;
  transition: box-shadow 0.2s;
}
.record-card:hover {
  box-shadow: 0 4px 16px rgba(34, 139, 34, 0.18);
}
.record-header {
  font-size: 18px;
  font-weight: bold;
  color: #388e3c;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.consumable-type {
  background: #c8e6c9;
  color: #2e7d32;
  border-radius: 8px;
  padding: 2px 10px;
  font-size: 14px;
  margin-left: 8px;
  height: 25px;
}
.co2 {
  font-size: 16px;
  color: #388e3c;
  margin-bottom: 8px;
}
.co2-num {
  font-weight: bold;
  color: #43a047;
  font-size: 18px;
  margin: 0 4px;
}
.record-time {
  font-size: 13px;
  color: #888;
}
</style>
