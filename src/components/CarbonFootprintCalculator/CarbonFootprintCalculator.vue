<script setup>
import { ref, computed } from 'vue';
import CarbonFootprintResult from './CarbonFootprintResult.vue';
import { ElInputNumber, ElIcon, ElButton } from 'element-plus';
import {
  ForkSpoon,
  Bicycle,
  OfficeBuilding,
  SoldOut
} from '@element-plus/icons-vue';


const carbonData = ref([
  { category: '衣', item: '普通纯棉T恤 (约0.2千克)', carbonFootprint: 0.2, unitCarbon: 0.0636 },
  { category: '衣', item: '一件聚酯纤维T恤 (约0.2千克)', carbonFootprint: 1.1, unitCarbon: 0.05 },
  { category: '衣', item: '一件棉质衬衫 (约0.3千克)', carbonFootprint: 2.1, unitCarbon: 0.0955 },
  { category: '衣', item: '一件牛仔裤 (约0.5千克)', carbonFootprint: 1.5, unitCarbon: 0.0682 },
  { category: '衣', item: '一件羊毛外套 (约1千克)', carbonFootprint: 3.5, unitCarbon: 0.1591 },
  { category: '衣', item: '一条丝绸围巾 (约0.1千克)', carbonFootprint: 10, unitCarbon: 0.4545 },
  { category: '食', item: '一公斤牛肉', carbonFootprint: 0.8, unitCarbon: 0.0364 },
  { category: '食', item: '一公斤猪肉', carbonFootprint: 5.3, unitCarbon: 0.2409 },
  { category: '食', item: '一公斤鸡肉', carbonFootprint: 2.8, unitCarbon: 0.1273 },
  { category: '食', item: '一公斤鱼肉', carbonFootprint: 5.6, unitCarbon: 0.2545 },
  { category: '食', item: '一公斤奶酪', carbonFootprint: 22.7, unitCarbon: 1.0318 },
  { category: '食', item: '一公斤鸡蛋', carbonFootprint: 2.1, unitCarbon: 0.0955 },
  { category: '食', item: '一公斤大米', carbonFootprint: 0.8, unitCarbon: 0.0364 },
  { category: '食', item: '一公斤面粉', carbonFootprint: 0.6, unitCarbon: 0.0273 },
  { category: '食', item: '一公斤土豆', carbonFootprint: 0.1, unitCarbon: 0.0045 },
  { category: '食', item: '一公斤洋葱', carbonFootprint: 0.4, unitCarbon: 0.0182 },
  { category: '食', item: '一公斤西红柿', carbonFootprint: 0.3, unitCarbon: 0.0136 },
  { category: '食', item: '一公斤苹果', carbonFootprint: 0.5, unitCarbon: 0.0227 },
  { category: '食', item: '一公斤香蕉', carbonFootprint: 0.7, unitCarbon: 0.0318 },
  { category: '食', item: '一公斤橙子', carbonFootprint: 0.65, unitCarbon: 0.0295 },
  { category: '食', item: '一公斤咖啡豆', carbonFootprint: 0.75, unitCarbon: 0.0341 },
  { category: '食', item: '一公斤巧克力', carbonFootprint: 4.8, unitCarbon: 0.2182 },
  { category: '食', item: '一杯咖啡 (约250毫升)', carbonFootprint: 0.15, unitCarbon: 0.0068 },
  { category: '食', item: '一杯牛奶 (约250毫升)', carbonFootprint: 0.3, unitCarbon: 0.0136 },
  { category: '住', item: '一小时空调 (1小时，火电)', carbonFootprint: 0.588, unitCarbon: 0.0267 },
  { category: '住', item: '看55英寸液晶电视 (1小时)', carbonFootprint: 0.12, unitCarbon: 0.0055 },
  { category: '住', item: '家用冰箱 (假设每天运行30分钟，150瓦，火电)', carbonFootprint: 0.06, unitCarbon: 0.0027 },
  { category: '住', item: '普通滚筒洗衣机洗一次 (100升水，火电)', carbonFootprint: 0.32, unitCarbon: 0.0145 },
  { category: '住', item: '电热水器 (2000瓦，1小时，火电)', carbonFootprint: 1.6, unitCarbon: 0.0727 },
  { category: '住', item: '使用电脑 (主机200瓦+显示器80瓦，1小时，火电)', carbonFootprint: 0.224, unitCarbon: 0.0102 },
  { category: '住', item: '笔记本电脑 (60瓦，1小时，火电)', carbonFootprint: 0.048, unitCarbon: 0.0022 },
  { category: '住', item: '智能手机 (使用1小时)', carbonFootprint: 0.0005, unitCarbon: 0.000023 },
  { category: '住', item: '白炽灯 (1小时，火电)', carbonFootprint: 0.048, unitCarbon: 0.0022 },
  { category: '住', item: '节能灯 (1小时，火电)', carbonFootprint: 0.0096, unitCarbon: 0.000436 },
  { category: '住', item: 'LED灯 (1小时，火电)', carbonFootprint: 0.0072, unitCarbon: 0.000327 },
  { category: '住', item: '一次淋浴 (10分钟，火电)', carbonFootprint: 0.5112, unitCarbon: 0.0232 },
  { category: '住', item: '处理1千克不可回收垃圾 (约5千克)', carbonFootprint: 150, unitCarbon: 6.8182 },
  { category: '住', item: '处理1千克可回收垃圾 (约0.5千克)', carbonFootprint: 8, unitCarbon: 0.3636 },
  { category: '行', item: '自来水 (每升)', carbonFootprint: 0.6 / 1000, unitCarbon: 0.000027 },
  { category: '行', item: '电动汽车 (每公里)', carbonFootprint: 0.03, unitCarbon: 0.0014 },
  { category: '行', item: '小型汽油车 (每公里)', carbonFootprint: 0.184, unitCarbon: 0.0084 },
  { category: '行', item: '中型汽油车 (每公里)', carbonFootprint: 0.216, unitCarbon: 0.0098 },
  { category: '行', item: '公交车 (满载50人) 每公里每人', carbonFootprint: 0.013, unitCarbon: 0.0006 },
  { category: '行', item: '地铁 (每公里每人)', carbonFootprint: 0.016, unitCarbon: 0.0007 },
  { category: '行', item: '火车 (每公里每人)', carbonFootprint: 0.0115, unitCarbon: 0.000523 },
  { category: '行', item: '新能源汽车 (火电) (每公里)', carbonFootprint: 0.12, unitCarbon: 0.0055 },
  { category: '行', item: '新能源汽车 (可再生能源发电制氢) (每公里)', carbonFootprint: 0.02, unitCarbon: 0.0009 },
  { category: '行', item: '飞机 (短途，每公里每人)', carbonFootprint: 0.1, unitCarbon: 0.0045 },
  { category: '行', item: '摩托车 (每公里)', carbonFootprint: 0.1, unitCarbon: 0.0045 },
  { category: '行', item: '共享单车 (每次使用)', carbonFootprint: 0.003, unitCarbon: 0.000136 },
  { category: '行', item: '步行 (每公里每人)', carbonFootprint: 0.0008, unitCarbon: 0.000036 },
  { category: '行', item: '出租车 (每公里)', carbonFootprint: 0.175, unitCarbon: 0.00795 },
]);

const selectedCategory = ref(null);
const selectedItemToAdd = ref(null);
const quantityToAdd = ref(1);
const itemsToCalculate = ref([]);
const categories = ['衣', '食', '住', '行'];

const filteredCarbonData = computed(() => {
  if (selectedCategory.value) {
    return carbonData.value.filter(item => item.category === selectedCategory.value);
  }
  return [];
});

const addItem = () => {
  if (selectedItemToAdd.value) {
    itemsToCalculate.value.push({
      item: selectedItemToAdd.value,
      quantity: quantityToAdd.value,
    });
    selectedItemToAdd.value = null;
    quantityToAdd.value = 1;
    selectedCategory.value = null;
  }
};

const categoryFootprintsInternal = computed(() => {
  const footprints = {};
  categories.forEach(cat => (footprints[cat] = 0));
  itemsToCalculate.value.forEach(itemData => {
    footprints[itemData.item.category] += itemData.item.carbonFootprint * itemData.quantity;
  });
  return Object.entries(footprints).map(([name, value]) => ({ name, value }));
});

// 将计算结果暴露出去
const categoryFootprints = computed(() => categoryFootprintsInternal.value);

const totalCarbonFootprint = computed(() => {
  return itemsToCalculate.value.reduce((total, itemData) => {
    return total + (itemData.item.carbonFootprint * itemData.quantity);
  }, 0);
});

const setActiveCategory = (category) => {
  selectedCategory.value = category;
  selectedItemToAdd.value = null;
};

const selectItemToAdd = (item) => {
  selectedItemToAdd.value = item;
};

defineExpose({
  categoryFootprints // 暴露这个计算属性
});
</script>


<template>
  <h2>碳足迹计算器</h2>

  <div>
    <h3>选择类别:</h3>
    <div class="category-buttons">
      <el-button
        v-for="category in categories"
        :key="category"
        @click="setActiveCategory(category)"
        :type="selectedCategory === category ? 'primary' : ''"
      >
        <el-icon v-if="category === '食'"><ForkSpoon /></el-icon>
        <el-icon v-if="category === '行'"><Bicycle /></el-icon>
        <el-icon v-if="category === '住'"><OfficeBuilding /></el-icon>
        <el-icon v-if="category === '衣'"><SoldOut /></el-icon>
        {{ category }}
      </el-button>
    </div>
  </div>

  <div v-if="selectedCategory">
    <h3>{{ selectedCategory }} - 选择物品:</h3>
    <div class="item-buttons">
      <el-button
        v-for="item in filteredCarbonData"
        :key="item.item"
        @click="selectItemToAdd(item)"
        :type="selectedItemToAdd === item ? 'success' : ''"
      >{{ item.item }}</el-button>
    </div>
  </div>

  <div v-if="selectedItemToAdd">
    <h3>{{ selectedItemToAdd.item }} - 输入数量:</h3>
    <label for="addQuantity">数量:</label>
    <el-input-number v-model="quantityToAdd" :min="1" />
    <el-button type="primary" @click="addItem" style="margin-top: 10px;">添加到计算</el-button>
  </div>

  <div v-if="itemsToCalculate.length > 0">
    <h3>待计算的项目:</h3>
    <ul>
      <li v-for="(itemData, index) in itemsToCalculate" :key="index">
        {{ itemData.item.item }} - 数量: {{ itemData.quantity }}
        <el-button size="small" type="danger" @click="itemsToCalculate.splice(index, 1)">移除</el-button>
      </li>
    </ul>
    <carbon-footprint-result :items-to-calculate="itemsToCalculate" :total-carbon="totalCarbonFootprint" />

    </div>
  <div v-else-if="totalCarbonFootprint > 0">
    <carbon-footprint-result :items-to-calculate="[]" :total-carbon="totalCarbonFootprint" />
    </div> 
</template>
<style scoped>
.category-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.item-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
}

.el-button+.el-button {
    margin-left: 0;
}


</style>