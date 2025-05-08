<template>
  <div class="swiper banner-container">
    <div class="swiper-wrapper">
      <div v-for="(item, index) in bannerData" :key="index" class="swiper-slide">
        <img :src="item.url" :alt="item.alt" />
      </div>
    </div>
    <div class="swiper-button-prev"></div>
    <!--左箭头。如果放置在swiper外面，需要自定义样式。-->
    <div class="swiper-button-next"></div>
    <!--右箭头。如果放置在swiper外面，需要自定义样式。-->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Swiper from 'swiper'
import oneImg from '@assets/images/one.jpg'
import user_t from '@assets/images/user_t.jpg'
const bannerData = ref([
  {
    url: oneImg,
    alt: 'one',
  },
  {
    url: user_t,
    alt: 'user_t',
  },
])
const switchTheme = (theme) => {
  store.switchTheme(theme)
}
onMounted(() => {
  var mySwiper = new Swiper('.swiper', {
    autoplay: {
      delay: 1000,
      stopOnLastSlide: false,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })
  var mySwiper = new Swiper('.swiper', {
    autoplay: true, //等同于以下设置
    /*autoplay: {
    delay: 3000,
    stopOnLastSlide: false,
    disableOnInteraction: true,
    },*/
  })
})
</script>

<style lang="less" scoped>
.banner-container {
  height: 55vh;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}
.swiper {
  --swiper-navigation-color: #fff; /* 单独设置按钮颜色 */
  --swiper-navigation-size: 15px; /* 设置按钮大小 */
}
.swiper-button-prev {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 3px;
  left: 0 !important;
  opacity: 0.6 !important;
}
.swiper-button-next {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 3px;
  right: 0 !important;
  opacity: 0.6 !important;
}
// .box {
//   margin-top: 300px;
//   width: 300px;
//   height: 300px;
//   background: var(--background-color);
// }
</style>
