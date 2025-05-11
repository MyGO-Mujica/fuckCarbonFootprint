<script setup>
import { defineProps } from 'vue';

const { itemsToCalculate, totalCarbon } = defineProps({
  itemsToCalculate: {
    type: Array,
    required: true,
  },
  totalCarbon: {
    type: Number,
    required: true,
  },
});

const calculateItemCarbon = (itemData) => {
  return (itemData.item.carbonFootprint * itemData.quantity).toFixed(4);
};
</script>

<template>
  <div v-if="itemsToCalculate.length > 0">
    <h3>碳足迹明细:</h3>
    <ul>
      <li v-for="itemData in itemsToCalculate" :key="itemData.item.item">
        {{ itemData.item.item }} - 数量: {{ itemData.quantity }} - 碳足迹: {{ calculateItemCarbon(itemData) }} 千克二氧化碳当量
      </li>
    </ul>
    <h3>总碳足迹: {{ totalCarbon.toFixed(4) }} 千克二氧化碳当量</h3>
  </div>
  <div v-else-if="totalCarbon > 0">
    <h3>总碳足迹: {{ totalCarbon.toFixed(4) }} 千克二氧化碳当量</h3>
  </div>
</template>

<style scoped>
/* 可以添加样式 */
</style>