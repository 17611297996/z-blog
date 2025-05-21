<template>
  <div>
    <nut-popup
      v-model:visible="show"
      position="left"
      class="slide-container"
      style="width: 60%; height: 100%"
    >
      <div class="userInfo"></div>
      <div class="menu-container">
        <ul class="menu-list">
          <li class="menu-item">
            <div class="menu-dot"></div>
            <span @click="handleHome">首页</span>
          </li>
          <ul>
            <li class="menu-item active">
              <div class="menu-dot"></div>
              <span>技术点滴</span>
            </li>
            <li
              class="item-tag"
              v-for="(item, index) in category"
              :key="index"
              @click="handleTag(item)"
            >
              {{ item }}
            </li>
            <!-- <li class="item-tag">服务端</li> -->
          </ul>
        </ul>
        <div class="theme-toggle">
          <i class="theme-icon"></i>
        </div>
      </div>
    </nut-popup>
  </div>
</template>

<script setup>
import { ref, defineExpose, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@store/mainStore.js'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = useMainStore()
const { dripData, category } = storeToRefs(store)
const show = ref(false)
const handleClick = (showValue) => {
  show.value = showValue ? showValue : false
}
const handleHome = () => {
  window.location.reload()
  router
    .push({
      path: '/home',
    })
    .then((res) => {
      window.location.reload()
    })
}
onMounted(async () => {
  await store.getCategory()
  await store.getBasicInfo()
  console.log(dripData.value, 'dripData')
})
const handleTag = (item) => {
  window.location.reload()
  router
    .push({
      path: '/home',
      query: {
        tag: item,
      },
    })
    .then((res) => {
      window.location.reload()
    })
}
defineExpose({
  handleShowMenu: handleClick,
})
</script>

<style lang="less" scoped>
.menu-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  //   background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.menu-list {
  width: 60%;
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 8px 0;
  color: #eee;
  font-size: 18px;
  position: relative;
}

.menu-item.active {
  color: #ff4494;
}

.menu-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #eee;
  margin-right: 8px;
}

.menu-item.active .menu-dot {
  background-color: #ff4494;
}

.submenu {
  //   position: absolute;
  //   left: 30px;
  //   top: 0;
  //   background-color: #f5f5f5;
  //   border-radius: 5px;
  //   //   padding: 5px 10px;
  //   display: none;
}

.menu-item.active .submenu {
  display: block;
}
.item-tag {
  background: rgba(198, 174, 174, 0.06);
  color: #eee;
  padding: 4px 12px;
  font-size: 16px;
  border-radius: 4px;
  margin-bottom: 5px;
  margin-left: 5%;
  margin-left: 30px;
}
.submenu-item {
  padding: 5px 0;
  font-size: 12px;
  color: #666;
}

.theme-toggle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
}

.theme-icon {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #333;
}
.userInfo {
  width: 100%;
  height: 100px;
}
</style>
