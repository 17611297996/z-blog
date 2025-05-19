<template>
  <div class="home-container" ref="headerRef">
    <div class="header" ref="headerBgColor" :style="{ backgroundColor: headerBgColor }">
      <div class="left">
        <img src="@assets/images/user.jpg" />
        <div class="box">
          <span class="menu-item" @click="handleHome">首页</span>
          <div class="dropdown">
            <span class="menu-item has-dropdown">技术点滴 <i class="arrow-down">▼</i></span>
            <div class="dropdown-content">
              <div class="dropdown-item" v-for="(item, index) in dripData" :key="index">
                <span>{{ item.title }}</span>
                <i class="item-arrow">▼</i>
                <div class="third-level">
                  <div
                    class="third-item"
                    v-for="item in item.children"
                    :key="item"
                    @click="handleTag(item)"
                  >
                    {{ item }}
                  </div>
                  <!-- <div class="third-item">React</div>
                  <div class="third-item">Angular</div> -->
                </div>
              </div>
              <!-- <div class="dropdown-item">
                <span>后端开发</span>
                <i class="item-arrow">▼</i>
                <div class="third-level">
                  <div class="third-item">Node.js</div>
                  <div class="third-item">Python</div>
                  <div class="third-item">Java</div>
                </div>
              </div>
              <div class="dropdown-item">
                <span>数据库</span>
                <i class="item-arrow">▼</i>
                <div class="third-level">
                  <div class="third-item">MySQL</div>
                  <div class="third-item">MongoDB</div>
                  <div class="third-item">PostgreSQL</div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="banner-container">
      <Banner />
      <Search />
    </div>
    <div class="list">
      <div class="list-header">
        <img v-lazy="Lilia" alt="Lilia" />
        <div class="folder-item">
          <div class="folder-icon">
            <i class="folder-icon-placeholder" v-if="tag"><FolderOpened /></i>
          </div>
          <div class="folder-info">
            <div class="folder-title">
              <span>{{ tag }}</span>
              <span class="article-count">· 共{{ listData.length }}篇</span>
            </div>
            <div class="progress-bar"></div>
          </div>
        </div>
      </div>
      <List />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Banner from '@components//Banner/index.vue'
import Search from '@components/Search/index.vue'
// import Search from './components/Search.vue'
import List from './components/List.vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@store/mainStore.js'
import Lilia from '@assets/images/Lilia.webp'
import { FolderOpened } from '@element-plus/icons-vue'
import NoData from '@components/NoData/index.vue'
const store = useMainStore()
const router = useRouter()
const { dripData, listData } = storeToRefs(store)
const route = useRoute()
const tag = route.query.tag ? route.query.tag : ''
const headerRef = ref(null)
const headerBgColor = ref(null)
onMounted(async () => {
  window.addEventListener('scroll', handleScroll)
  await store.getBasicInfo()
  console.log(dripData, 'dripData')
})
const handleScroll = () => {
  // console.log(window.scrollY, 'window.scrollY')
  // 吸顶
  if (headerRef.value) {
    if (window.scrollY > 300) {
      headerBgColor.value = 'rgba(0, 0, 0, 0.3)'
    } else {
      headerBgColor.value = 'transparent'
    }
  }
}
// watch(
//   () => route.query,
//   (newQuery) => {},
//   { deep: true, immediate: true },
// )
const handleHome = () => {
  router
    .push({
      path: '/',
    })
    .then(() => {
      window.location.reload()
    })
}
const handleTag = (value) => {
  router
    .push({
      path: '/',
      query: {
        tag: value,
      },
    })
    .then(() => {
      window.location.reload()
    })
}
</script>

<style lang="less" scoped>
.home-container {
  width: 100vw;
  height: 100%;
}
.banner-container {
  height: 55vh;
  width: 100%;
  position: relative;
}
.header {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  // background-color: #333;
  padding: 10px 20px;
  display: flex;
  align-items: center;
}

img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.left {
  display: flex;
  align-items: center;
  margin-left: 10%;
}

.box {
  display: flex;
  align-items: center;
}

.menu-item {
  padding: 10px 15px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  transition: color 0.3s ease;
  position: relative;
}

.menu-item:hover {
  color: #f04494;
}

.has-dropdown {
  display: flex;
  align-items: center;
}

.arrow-down {
  margin-left: 5px;
  font-size: 10px;
  transition: transform 0.3s ease;
}

.has-dropdown:hover .arrow-down {
  transform: rotate(180deg);
}

.dropdown {
  position: relative;
}

.dropdown-content {
  display: none;
  position: absolute;
  font-size: 14px;
  top: 100%;
  left: 0;
  background-color: #fff;
  min-width: 120px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 8px;
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.dropdown:hover .dropdown-content {
  display: block;
  opacity: 1;
  transform: translateY(0);
}

.dropdown-item {
  padding: 10px 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
  color: #f04494;
  padding-left: 20px;
}

.item-arrow {
  margin-left: 10px;
  font-size: 10px;
  transition: transform 0.3s ease;
}

.dropdown-item:hover .item-arrow {
  transform: rotate(-90deg);
}

.third-level {
  display: none;
  position: absolute;
  top: 0;
  left: 100%;
  background-color: #fff;
  min-width: 100px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 8px;
  opacity: 0;
  transform: translateX(10px);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.dropdown-item:hover .third-level {
  display: block;
  opacity: 1;
  transform: translateX(0);
}

.third-item {
  display: block;
  padding: 6px 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #333; /* 默认字体颜色 */
}
.third-item:nth-child(1) {
  margin-top: 3px;
}
.third-item:hover {
  // background-color: #f5f5f5;
  color: #f04494 !important; /* 确保滑过时字体颜色变为 #f04494 */
  padding-left: 20px;
}

/* 修复圆角问题 */
.third-level {
  overflow: hidden; /* 确保圆角不会被内容溢出 */
}

.dropdown-item:first-child {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.dropdown-item:last-child {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.third-item:first-child {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.third-item:last-child {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
.list {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.list-header {
  width: 60%;
  height: 256px;
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
    bottom: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    padding: 12px 16px;
    // background-color: #2a2a2a;
    border-radius: 8px;
    cursor: pointer;
    // position: relative;
    overflow: hidden;
    transition: background-color 0.3s ease;
  }

  .folder-item:hover {
    // background-color: #333;
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
    font-size: 14px;
    color: white;
    span {
      font-weight: bold;
    }

    display: flex;
    align-items: center;
  }

  .article-count {
    font-size: 12px;
    margin-left: 8px;
  }

  .progress-bar {
    position: absolute;
    bottom: 8px;
    left: 15px;
    height: 4px;
    width: 40px; /* 初始宽度 */
    background-color: #ff4494;
    border-radius: 2px;
    // overflow: hidden;
  }

  .progress-bar::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 100%;
    background-color: #ff4494;
    width: 0;
    transition: width 0.5s ease;
  }

  .folder-item:hover .progress-bar::after {
    width: 80px;
    border-radius: 2px;
  }
}
</style>
