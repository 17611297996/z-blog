<template>
  <div>
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
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const handleTag = () => {
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

<style lang="scss" scoped></style>
