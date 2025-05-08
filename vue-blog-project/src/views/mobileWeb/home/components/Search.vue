<template>
  <div class="search-container">
    <div class="search-wrapper" @click="focusInput">
      <div class="input-box" :class="{ focused: isFocused }">
        <input
          ref="inputRef"
          v-model="inputValue"
          class="search-input"
          @focus="handleFocus"
          @blur="handleBlur"
          @keyup.enter="handleSearch"
        />
        <label :class="['placeholder', { elevated: isLabelActive }]">
          {{ placeholder }}
        </label>
        <div class="search-icon" @click="handleSearch">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M8.5 15C11.5376 15 14 12.5376 14 9.5C14 6.46243 11.5376 4 8.5 4C5.46243 4 3 6.46243 3 9.5C3 12.5376 5.46243 15 8.5 15Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M17 17L13.5 13.5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const tags = ['微信', 'react', '小程序', '前端', '性能监控']
const props = defineProps({
  placeholder: {
    type: String,
    default: '开启精彩搜索',
  },
})

const inputValue = ref('')
const isFocused = ref(false)
const inputRef = ref(null)

const isLabelActive = computed(() => isFocused.value || inputValue.value.length > 0)

const handleFocus = () => {
  isFocused.value = true
}

const handleBlur = () => {
  isFocused.value = false
}

const focusInput = () => {
  inputRef.value.focus()
}

const handleSearch = () => {
  // 这里添加搜索逻辑
  console.log('执行搜索:', inputValue.value)
}
</script>

<style scoped>
.search-container {
  position: absolute;
  width: 90%;
  z-index: 9;
  height: 100%;
  font-family: -apple-system, system-ui;
}

.search-wrapper {
  position: relative;
}

.input-box {
  position: relative;
  height: 51px;
  /* border: 1px solid #ebedf0; */
  border-radius: 24px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
}

.input-box.focused {
  /* border-color: #f04494; */
  /* box-shadow: 0 2px 12px rgba(7, 193, 96, 0.1); */
}

.search-input {
  width: 100%;
  height: 100%;
  padding: 10px 56px 0 16px; /* 右侧留出图标空间 */
  border: none;
  border-radius: 24px;
  font-size: 14px;
  line-height: 24px;
  outline: none;
  color: rgb(85, 85, 85);
  /* background: transparent; */
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: saturate(5) blur(20px);
  border: 0;
  box-sizing: border-box;
}

.placeholder {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 14px;
  pointer-events: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.placeholder.elevated {
  top: 2px;
  left: 12px;
  transform: translateY(0) scale(0.85);
  font-size: 12px;
  color: #f04494;
  /* background: #fff; */
  padding: 0 4px;
}

.search-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #c0c4cc;
  cursor: pointer;
  transition: color 0.2s;
}

.search-icon:hover {
  color: #f04494;
}

.search-icon svg {
  display: block;
  width: 20px;
  height: 20px;
}
.tag-container {
  /* padding: 16px; */
  max-width: 800px;
  margin: 20px auto;
  display: flex;
  color: #888;
  justify-content: center;
}

.tag-group {
  display: flex;
  align-items: center;
  gap: 12px;
  /* background: #f5f7fa; */
  border-radius: 8px;
  padding: 12px 16px;
  margin-top: -2%;
}

/* .tag-header {
  font-size: 14px;
  color: #909399;
  padding-right: 12px;
  border-right: 1px solid #ebeef5;
} */

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-item {
  font-size: 12px;
  color: #606266;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 4px;
  padding: 4px 10px;
  font-weight: bold;
  transition: all 0.2s ease;
}

.tag-item:hover {
  /* border-color: #07c160; */
  /* color: #07c160; */
  background: rgba(244, 240, 240, 0.5);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(7, 193, 96, 0.1);
}

/* 选中状态样式 */
.tag-item.active {
  /* background: #07c160; */
  color: white;
  /* border-color: #06ad56; */
}
</style>
