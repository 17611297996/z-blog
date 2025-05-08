<template>
  <div class="list-container">
    <div class="item" v-for="(item, index) in listData" :key="index">
      <div class="img-container">
        <img :src="itemImg" />
      </div>
      <div class="right">
        <div class="content">
          <p @click="handleDetail(item.filename)">
            {{ item.title }}
          </p>
          <p>{{ item.description }}</p>
          <div class="tag">
            <span>{{ item.tags[0] }}</span>
          </div>
          <div class="user-info">
            <div class="user">
              <img src="@assets/images/avatar-default.png" />
              <span class="name">{{ basicInfo.userName }}</span>
            </div>
            <div class="time">{{ moment(item.date).format('YYYY-MM-DD HH:mm') }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import itemImg from '@assets/images/item-img.png'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@store/mainStore'
import moment from 'moment'
const router = useRouter()
const store = useMainStore()
const { listData, basicInfo } = storeToRefs(store)
const handleDetail = (value) => {
  router
    .push({
      path: '/detail',
      query: {
        file: value,
      },
    })
    .then(() => {
      window.location.reload()
    })
}
onMounted(async () => {
  await store.getList()
})
</script>

<style lang="less" scoped>
.list-container {
  width: 95% !important;
}
.item {
  display: flex;
  padding: 15px;
  margin-top: 15px;
  background: #fff;
  // border: 1px solid #ccc;
  width: 100%;
  box-shadow: rgba(116, 116, 116, 0.08);
  border-radius: 15px;
  p:nth-child(1) {
    font-weight: bold;
    color: #000;
    width: 90%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  p:nth-child(2) {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: #777;
    font-size: 14px;
    margin-bottom: 18px;
    margin-top: 10px;
    // margin-top: 4%;
    // margin-bottom: 3%;
  }
  .tag {
    // margin-bottom: 5%;
    span {
      font-size: 10px;
      padding: 3px 5px;
      border-radius: 3px;
      margin-bottom: 5px;
      color: #2997f7;
      background: rgba(41, 151, 247, 0.1);
    }
  }
  .user-info {
    font-size: 12px;
    height: 30px;
    margin-top: 1%;
    display: flex;
    justify-content: space-between;

    div {
      display: flex;
      align-items: center;
    }
    .name {
      color: #888a8f;
      margin-left: 4px;
    }
    .time {
      color: #888a8f;
    }
    img {
      width: 25px;
      height: 25px;
      border-radius: 50%;
    }
  }
}
.right {
  width: calc(100% - 200px);
  margin-left: 2%;
}
.img-container {
  width: 190px;
  height: 133px;
  border-radius: 10px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
}
</style>
