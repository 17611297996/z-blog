// src/api/index.js
import axios from 'axios';

// 创建 axios 实例
const instance = axios.create({
    baseURL: 'http://localhost:5173', // 后端 API 的基础 URL
    timeout: 5000, // 请求超时时间 (毫秒)
});

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么
        return config;
    },
    (error) => {
        // 请求错误时做些什么
        console.error('请求错误:', error);
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    (response) => {
        // 2xx 范围内的状态码都会触发该函数
        // 对响应数据做些什么
        return response.data;
    },
    (error) => {
        // 超出 2xx 范围的状态码都会触发该函数
        // 对响应错误做些什么
        console.error('响应错误:', error);
        return Promise.reject(error);
    }
);

// 封装通用请求方法
const request = async (apiString, data = {}) => {
    // 从 apiString 中提取 method 和 url
    const [method, url] = apiString.split(' ');
    const isGetRequest = method === 'GET';

    try {
        const response = await instance({
            method,
            url,
            [isGetRequest ? 'params' : 'data']: data,
        });
        return response;
    } catch (error) {
        console.error('请求失败:', error);
        throw error;
    }
};

export default request;