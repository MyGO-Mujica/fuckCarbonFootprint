<template>
  <h1 class="title">碳踪客のapp</h1>
  <div class="container">
    <Card :data-image="appLogin">
      <template #header><h1>登录</h1></template>
      <template #content><p>简洁明了的注册登录界面</p></template>
    </Card>
    <Card :data-image="appCalculator">
      <template #header><h1>计算器</h1></template>
      <template #content><p>碳足迹计算页面</p></template>
    </Card>
    <Card :data-image="appVisualization">
      <template #header><h1>可视化</h1></template>
      <template #content><p>碳足迹可视化，数据一目了然</p></template>
    </Card>
    <Card :data-image="appAiChat">
      <template #header><h1>AI聊天</h1></template>
      <template #content><p>智能ai聊天助手，随时为您解答疑问</p></template>
    </Card>
  </div>
  <button class="buttonDownload" @click="downloadApp">Download</button>
</template>

<script setup>
import Card from './CardPage.vue'
import appLogin from '@/assets/app1.jpg'
import appCalculator from '@/assets/app2.jpg'
import appVisualization from '@/assets/app3.jpg'
import appAiChat from '@/assets/app4.jpg'

function downloadApp() {
  navigator.clipboard.writeText('4skh').then(
    () => {
      ElMessage.success('提取码已复制，3秒后将自动跳转到网盘页面')
      setTimeout(() => {
        window.open('https://pan.baidu.com/s/1AmUao3d-ECDLpbo8MdLnZQ', '_blank')
      }, 3000)
    },
    () => {
      ElMessage.info('请手动复制提取码：4skh，3秒后将自动跳转到网盘页面！')
      setTimeout(() => {
        window.open('https://pan.baidu.com/s/1AmUao3d-ECDLpbo8MdLnZQ', '_blank')
      }, 3000)
    },
  )
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Raleway:500,700|Playfair+Display:700');

body {
  margin: 40px 0;
  font-family: 'Raleway';
  background-color: #bcaaa4;
}

.title {
  font-size: 24px;
  font-weight: 700;
  color: #5d4037;
  text-align: center;
}

.container {
  padding: 40px 80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.buttonDownload {
  display: inline-block;
  position: fixed;
  right: 120px;
  bottom: 75px;
  z-index: 100;
  padding: 10px 25px;
  background-color: #4cc713;
  color: white;
  font-family: sans-serif;
  text-decoration: none;
  font-size: 0.9em;
  text-align: center;
  text-indent: 15px;
  border: none;
}

.buttonDownload:hover {
  background-color: #45a21a;
  color: white;
}

.buttonDownload:before,
.buttonDownload:after {
  content: ' ';
  display: block;
  position: absolute;
  left: 15px;
  top: 52%;
}

.buttonDownload:before {
  width: 10px;
  height: 2px;
  border-style: solid;
  border-width: 0 2px 2px;
}

.buttonDownload:after {
  width: 0;
  height: 0;
  margin-left: 3px;
  margin-top: -7px;
  border-style: solid;
  border-width: 4px 4px 0 4px;
  border-color: transparent;
  border-top-color: inherit;
  animation: downloadArrow 1s linear infinite;
  animation-play-state: paused;
}

.buttonDownload:hover:before {
  border-color: #cdefbd;
}

.buttonDownload:hover:after {
  border-top-color: #cdefbd;
  animation-play-state: running;
}

@keyframes downloadArrow {
  0% {
    margin-top: -7px;
    opacity: 1;
  }

  0.001% {
    margin-top: -15px;
    opacity: 0.4;
  }

  50% {
    opacity: 1;
  }

  100% {
    margin-top: 0;
    opacity: 0.4;
  }
}
</style>
