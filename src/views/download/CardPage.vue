<template>
  <div class="card-wrap"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    ref="card">
    <div class="card" :style="cardStyle">
      <div class="card-bg" :style="[cardBgTransform, cardBgImage]"></div>
      <div class="card-info">
        <slot name="header"></slot>
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
const props = defineProps({ dataImage: String })

const card = ref(null)
const width = ref(0)
const height = ref(0)
const mouseX = ref(0)
const mouseY = ref(0)
let mouseLeaveDelay = null

onMounted(() => {
  width.value = card.value.offsetWidth
  height.value = card.value.offsetHeight
})

const mousePX = computed(() => mouseX.value / width.value)
const mousePY = computed(() => mouseY.value / height.value)

const cardStyle = computed(() => ({
  transform: `rotateY(${mousePX.value * 30}deg) rotateX(${mousePY.value * -30}deg)`
}))

const cardBgTransform = computed(() => ({
  transform: `translateX(${mousePX.value * -40}px) translateY(${mousePY.value * -40}px)`
}))

const cardBgImage = computed(() => ({
  backgroundImage: `url(${props.dataImage})`
}))

function handleMouseMove(e) {
  const rect = card.value.getBoundingClientRect()
  mouseX.value = e.clientX - rect.left - width.value / 2
  mouseY.value = e.clientY - rect.top - height.value / 2
}

function handleMouseEnter() {
  clearTimeout(mouseLeaveDelay)
}

function handleMouseLeave() {
  mouseLeaveDelay = setTimeout(() => {
    mouseX.value = 0
    mouseY.value = 0
  }, 1000)
}
</script>

<style scoped>
.card-wrap {
  margin: 10px;
  transform: perspective(800px);
  transform-style: preserve-3d;
  cursor: pointer;
}

.card-wrap:hover .card-info {
  transform: translateY(0);
  transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}
.card-wrap:hover .card-info p {
  opacity: 1;
  transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}
.card-wrap:hover .card-info:after {
  transition: 5s cubic-bezier(0.23, 1, 0.32, 1);
  opacity: 1;
  transform: translateY(0);
}
.card-wrap:hover .card-bg {
  opacity: 0.8;
  transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1), opacity 5s cubic-bezier(0.23, 1, 0.32, 1);
}
.card-wrap:hover .card {
  box-shadow:
    rgba(255, 255, 255, 0.2) 0 0 40px 5px,
    rgba(255, 255, 255, 1) 0 0 0 1px,
    rgba(0, 0, 0, 0.66) 0 30px 60px 0,
    inset #333 0 0 0 5px,
    inset white 0 0 0 6px;
  transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 2s cubic-bezier(0.23, 1, 0.32, 1);
}

.card {
  position: relative;
  width: 250px;
  height: 450px;
  background-color: #333;
  overflow: hidden;
  border-radius: 10px;
  box-shadow:
    rgba(0, 0, 0, 0.66) 0 30px 60px 0,
    inset #333 0 0 0 5px,
    inset rgba(255, 255, 255, 0.5) 0 0 0 6px;
  transition: 1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
}

.card-bg {
  opacity: 0.5;
  position: absolute;
  top: -15px;
  left: -20px;
  width: 100%;
  height: 100%;
  padding: 25px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition:
    1s cubic-bezier(0.445, 0.05, 0.55, 0.95),
    opacity 5s 1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  pointer-events: none;
}

.card-info {
  padding: 20px;
  position: absolute;
  bottom: 0;
  color: #fff;
  transform: translateY(50%);
  transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.card-info p {
  opacity: 0;
  text-shadow: rgba(0, 0, 0, 1) 0 2px 3px;
  transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.card-info:after {
  content: '';
  position: absolute;
  top: 0; left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to bottom, transparent 0%, rgba(241, 232, 232, 0.1) 100%);
  background-blend-mode: overlay;
  opacity: 0;
  transform: translateY(100%);
  transition: 5s 1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
}
.card-info h1 {
  font-family: "Playfair Display";
  font-size: 36px;
  font-weight: 700;
  text-shadow: rgba(0, 0, 0, 0.5) 0 10px 10px;
}
</style>
