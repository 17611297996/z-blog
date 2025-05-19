<template>
  <div class="mobile-web-container">
    <div class="header">
      <Banner />
      <Search />
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
      </div>
    </div>
    <div class="article-content">
      <div class="list-header">
        <img :src="Lilia" alt="Lilia" />
        <div class="folder-item">
          <div class="folder-icon">
            <i class="folder-icon-placeholder" v-if="tag"><FolderOpened /></i>
          </div>
          <div class="folder-info">
            <div class="folder-title">
              <span>技术点滴</span>
              <span class="article-count">· 共{{ listData.length }}篇</span>
            </div>
            <div class="progress-bar"></div>
          </div>
        </div>
      </div>
      <List />
    </div>
    <SlideNavBar ref="slideNavBarRef" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Banner from '@components/Banner/index.vue'
import Search from '@/components/Search/index.vue'
import { HorizontalN } from '@nutui/icons-vue'
import userImg from '@assets/images/user.jpg'
import SlideNavBar from '@components/Header/MobileHeader/SideNavBar.vue'
import Lilia from '@assets/images/Lilia.webp'
import List from './components/List.vue'
import { storeToRefs } from 'pinia'
const store = useMainStore()
import { useMainStore } from '@store/mainStore.js'
const { dripData, listData } = storeToRefs(store)
const slideNavBarRef = ref(null)
const navigationMenu = ref(null)
let horizontalNColor = ref('#fff')
const handleIcon = () => {
  slideNavBarRef.value.handleShowMenu(true)
}
onMounted(async () => {})
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

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

// 在组件卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="less" scoped>
.mobile-web-container {
  width: 100vw;
  height: 100vh;
  background: #f5f6f7;
  .header {
    width: 100%;
    position: relative;
  }
  /* 吸顶效果和动态背景 */
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
  .article-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .list-header {
    width: 95%;
    height: 220px;
    // background: red;
    margin-top: 20px;
    border-radius: 10px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
    .folder-item {
      position: absolute;
      bottom: 5px;
      z-index: 10;
      display: flex;
      align-items: center;
      padding: 12px 16px;
      //   background-color: #2a2a2a;
      border-radius: 8px;
      cursor: pointer;
      overflow: hidden;
      transition: background-color 0.3s ease;
    }
    .folder-item:hover {
      //   background-color: #333;
    }
    .folder-icon {
      margin-top: 3px;
      margin-right: 8px;
    }
    .folder-icon-placeholder {
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 4px;
      color: #fff;
    }
    .folder-info {
      flex: 1;
    }
    .folder-title {
      font-size: 16px;
      color: white;
      span {
        font-weight: bold;
      }
      display: flex;
      align-items: center;
    }
    .article-count {
      font-size: 18px;
      margin-left: 8px;
    }
    .progress-bar {
      position: absolute;
      bottom: 6px;
      left: 24px;
      height: 4px;
      width: 70px;
      background-color: #ff4494;
      border-radius: 2px;
    }
  }
}
</style>
