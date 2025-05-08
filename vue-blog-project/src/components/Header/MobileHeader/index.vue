<template>
  <div ref="navigationMenu" class="navigation-menu">
    <div class="menu">
      <HorizontalN
        name="dongdong"
        @click="handleIcon"
        :color="horizontalNColor"
        width="20px"
        height="20px"
      ></HorizontalN>
    </div>
    <div class="user">
      <img :src="userImg" />
    </div>
    <div class="right"></div>
    <SlideNavBar ref="slideNavBarRef" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { HorizontalN } from '@nutui/icons-vue'
import userImg from '@assets/images/user.jpg'
import SlideNavBar from './SideNavBar.vue'
const slideNavBarRef = ref(null)
const navigationMenu = ref(null)
let horizontalNColor = ref('#fff')
const handleIcon = () => {
  slideNavBarRef.value.handleShowMenu(true)
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
const handleScroll = () => {
  if (navigationMenu.value) {
    const scrollY = window.scrollY
    if (scrollY > 70) {
      navigationMenu.value.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'
      navigationMenu.value.style.boxShadow = '0 2px 10px rgba(116, 116, 116, 0.08)'
      horizontalNColor.value = '#888'
    } else {
      navigationMenu.value.style.backgroundColor = 'transparent'
      navigationMenu.value.style.boxShadow = 'none'
      horizontalNColor.value = '#eee'
    }
  }
}
// 在组件卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="less" scoped>
.navigation-menu {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 30px;
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;
}
.menu {
  cursor: pointer;
}
.user {
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
.right {
  width: 24px;
  height: 24px;
}
</style>
