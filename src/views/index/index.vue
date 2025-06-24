<script setup></script>

<template>
  <div class="card">
    <input type="radio" name="select" id="slide_1" checked />
    <input type="radio" name="select" id="slide_2" />
    <input type="radio" name="select" id="slide_3" />
    <input type="checkbox" id="slideImg" />

    <div class="slider">
      <label for="slide_1" class="slide slide_1"></label>
      <label for="slide_2" class="slide slide_2"></label>
      <label for="slide_3" class="slide slide_3"></label>
    </div>

    <div class="inner_part">
      <label for="slideImg" class="img">
        <img
          class="img_1"
          src="https://c4.wallpaperflare.com/wallpaper/978/131/617/kiz-kulesi-turkey-istanbul-maiden-s-tower-wallpaper-preview.jpg"
        />
      </label>
      <div class="content content_1">
        <div class="title">stanbul (伊斯坦布尔)</div>
        <div class="text">
          伊斯坦布尔，这座横跨两大洲的迷人城市，被博斯普鲁斯海峡一分为二。作为全球最重要的城市之一，伊斯坦布尔的碳排放主要来自其庞大的交通网络和日益增长的能源消耗。
          城市正在积极推行绿色交通和可再生能源项目，以减少其碳足迹。
        </div>
       
      </div>
    </div>

    <div class="inner_part">
      <label for="slideImg" class="img">
        <img
          class="img_2"
          src="https://c4.wallpaperflare.com/wallpaper/649/96/56/ankara-cityscape-night-night-sky-wallpaper-preview.jpg"
        />
      </label>
      <div class="content content_2">
        <div class="title">Ankara (安卡拉)</div>
        <div class="text">
          安卡拉是土耳其跳动的心脏，也是其第二大城市。作为政治中心，安卡拉的碳足迹主要受工业发展和城市化进程影响。
          近年来，安卡拉致力于提高能源效率，发展公共交通系统，并推广环保建筑，以构建更可持续的城市环境。
        </div>

      </div>
    </div>

    <div class="inner_part">
      <label for="slideImg" class="img">
        <img
          class="img_3"
          src="https://c4.wallpaperflare.com/wallpaper/620/34/558/turkey-izmir-mountains-wallpaper-preview.jpg"
        />
      </label>
      <div class="content content_3">
        <div class="title">İzmir (伊兹密尔)</div>
        <div class="text">
          伊兹密尔位于安纳托利亚半岛西部爱琴海沿岸，是土耳其第三大城市。作为一个重要的港口城市，其碳排放与航运、旅游业及城市垃圾处理密切相关。
          伊兹密尔正在探索海洋能源、推广循环经济，并提升城市绿化覆盖率，以应对气候变化，减少环境影响。
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100vh;
  font-family: 'Open Sans', sans-serif;
  background-color: #666666;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  position: absolute;
  height: 80vh;
  width: 100%;
  max-width: 1050px;
  margin: 25px 0 0 50px;
  background-color: #ffffff;
  border-radius: 25px;
  box-shadow: 10px 0 50px rgba(0, 0, 0, 0.5);
}

.card .inner_part {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0 0 30px;
  height: 350px;
  position: absolute;
}

#slideImg:checked ~ .inner_part {
  padding: 0;
  transition: 0.1s ease-in;
}

.inner_part .img {
  height: 360px;
  width: 360px;
  overflow: hidden;
  flex-shrink: 0;
  margin-top: 250px;
  border-radius: 20px;
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.2);
}

#slideImg:checked ~ .inner_part .img {
  height: 600px;
  width: 800px;
  z-index: 99;
  transition: 0.3s 0.2s ease-in;
}

.img img {
  height: 100%;
  width: 100%;
  cursor: pointer;
  opacity: 0;
  transition: 0.6s;
}

#slide_1:checked ~ .inner_part .img_1,
#slide_2:checked ~ .inner_part .img_2,
#slide_3:checked ~ .inner_part .img_3 {
  opacity: 1;
  transition-delay: 0.2s;
}

.content {
  padding: 0 20px 0 35px;
  width: 530px;
  margin-left: 50px;
  opacity: 0;
  transition: 0.6s;
}

#slideImg:checked ~ .inner_part .content {
  display: none;
}

#slide_1:checked ~ .inner_part .content_1,
#slide_2:checked ~ .inner_part .content_2,
#slide_3:checked ~ .inner_part .content_3 {
  opacity: 1;
  margin-left: 0;
  z-index: 100;
  transition-delay: 0.3s;
}

.content .title {
  font-size: 30px;
  font-weight: 700;
  color: #0d0925;
  margin: 280px 0 20px 30px;
}

.content .text {
  font-size: 19px;
  color: #4e4a67;
  margin: 0 auto 30px 30px;
  line-height: 1.5em;
  text-align: justify;
}

.content button {
  padding: 15px 20px;
  border: none;
  font-size: 16px;
  color: #fff0e6;
  font-weight: 600;
  letter-spacing: 1px;
  border-radius: 50px;
  cursor: pointer;
  outline: none;
  background: #000000;
  float: right;
}

.content button:hover {
  background: #cecece;
  color: #000000;
}

.slider {
  position: absolute;
  bottom: 25px;
  left: 55%;
  transform: translateX(-50%);
  z-index: 1;
}

#slideImg:checked ~ .slider {
  display: none;
}

.slider .slide {
  position: relative;
  height: 10px;
  width: 50px;
  background: #d9d9d9;
  border-radius: 5px;
  display: inline-flex;
  margin: 0 3px;
  cursor: pointer;
}

.slider .slide:before {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  height: 100%;
  width: -100%;
  background: #000000;
  border-radius: 10px;
  transform: scaleX(0);
  transition: transform 0.6s;
  transform-origin: left;
}

#slide_1:checked ~ .slider .slide_1:before,
#slide_2:checked ~ .slider .slide_2:before,
#slide_3:checked ~ .slider .slide_3:before {
  transform: scaleX(1);
  width: 100%;
}

input {
  display: none;
}
</style>
