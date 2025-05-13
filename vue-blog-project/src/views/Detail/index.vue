<template>
  <div class="detail-container">
    <MobileWeb v-if="isMobile()" />
    <PCHeader v-else />
    <div class="banner-container">
      <Banner />
      <Search />
    </div>
    <div class="detail-content">
      <div class="content">
        <div class="list-header">
          <img :src="Lilia" alt="Lilia" />
          <div class="folder-item">
            <div class="folder-icon">
              <i class="folder-icon-placeholder" v-if="tag"><FolderOpened /></i>
            </div>
            <div class="folder-info">
              <div class="folder-title">
                <span>{{ tag }}</span>
                <span class="article-count">{{ route.query.file }}</span>
              </div>
              <div class="progress-bar"></div>
            </div>
          </div>
        </div>
        <MdPreview :id="id" :modelValue="markdownHtml" @onGetCatalog="onGetCatalog" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { MdPreview, MdCatalog } from 'md-editor-v3'
import { useRouter, useRoute } from 'vue-router'
import 'md-editor-v3/lib/style.css'
import Banner from '@components/Banner/index.vue'
import Search from '@components/Search/index.vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@store/mainStore.js'
import Lilia from '@assets/images/Lilia.webp'
import MobileWeb from '@components/Header/MobileHeader/index.vue'
import PCHeader from '@components/Header/PCHeader/index.vue'
import { isMobile } from '@utils/index.js'
const store = useMainStore()
const { markdownHtml } = storeToRefs(store)
const route = useRoute()
const id = 'preview-only'
const text = ref()
const scrollElement = document.documentElement

onMounted(async () => {
  await store.getDetail('vue3学习测试文章.md')
})
</script>

<style lang="less" scoped>
.detail-container {
  width: 100vw;
  height: 100%;
}
::v-deep(.md-editor-preview-wrapper) {
  overflow: hidden;
}
#preview-only {
  overflow: hidden !important;
}
.banner-container {
  width: 100%;
  position: relative;
  // border-radius: 0 0 12px 12px;
  overflow: hidden;
}

.banner-container::after {
  content: '';
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 15px;
  background: linear-gradient(transparent, rgba(255, 255, 255, 0.9));
}

.detail-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

.content {
  width: 80%;
  max-width: 1000px;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.list-header {
  width: 100%;
  height: 30vh;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

img {
  width: 100%;
  height: 100%;
  display: block;
}

.folder-item {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 15px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
}

.folder-icon {
  margin-right: 12px;
}

.folder-icon-placeholder {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff4494;
  border-radius: 6px;
}

.folder-info {
  flex: 1;
}

.folder-title {
  font-size: 16px;
  font-weight: 600;
  color: white;
  margin-bottom: 8px;
}

.article-count {
  font-size: 14px;
  color: #ff4494;
}

.progress-bar {
  height: 3px;
  width: 40%;
  background-color: #ff4494;
  border-radius: 2px;
  position: relative;
  overflow: hidden;
}

.progress-bar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(90deg, #ff4494, #ff6b9c);
}

/* 媒体查询：适应移动设备 */
@media (max-width: 1024px) {
  .content {
    width: 90%;
    padding: 20px;
  }
}

@media (max-width: 768px) {
  .list-header {
    width: 100%;
    height: auto;
    img {
      height: auto;
    }
  }
  .content {
    width: 95%;
    padding: 15px;
  }
}
</style>
