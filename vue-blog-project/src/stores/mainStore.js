import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import api from "@api/index.js"
// import axios from "axios"
import http from "@utils/http.js"
export const useMainStore = defineStore('mainStore', () => {
    const route = useRoute();
    const listData = ref([]);
    const dripData = ref([])
    const basicInfo = ref({}) //基础信息，存放技术点滴与用户名称，需要可在服务端在添加加
    const category = ref([])
    const markdownHtml = ref('')
    function clearMarkdownHtml() {
        markdownHtml.value = ''
    }
    async function getList() {
        let res = await http(api.getList, route.query);
        listData.value = res.data;
        console.log(res.data, 'res.data')
    }
    async function getBasicInfo() {
        console.log(route.query, 'query')

        let res = await http(api.getBasicInfo);
        dripData.value = res.data[0]?.drip;
        basicInfo.value = res.data[0]
    }
    async function getDetail() {
        console.log(route.query, 'query')
        let res = await http(`GET /api/markdown-content/${route.query.file}`);
        markdownHtml.value = res.content
        console.log(res, 'res')
    }
    async function getCategory() {

        let res = await http(api.getCategory);
        category.value = res.data
        console.log(res, 'res')
    }


    return { listData, getList, dripData, getBasicInfo, basicInfo, getDetail, markdownHtml, getCategory, category, clearMarkdownHtml }
})
