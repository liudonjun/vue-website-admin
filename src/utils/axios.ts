// axiosConfig.js

import axios from 'axios';
import { loadDataFromStorage } from './util';

// 创建一个 Axios 实例
const instance = axios.create({
  // baseURL: 'https://api.ldjun.cn:9000', // 设置基础URL，根据你的实际情况修改
  baseURL: 'http://localhost:9000', // 设置基础URL，根据你的实际情况修改
  timeout: 30000, // 请求超时时间（毫秒）
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在请求发送之前做些什么
    // 例如，可以在请求头中添加认证信息
    const token = loadDataFromStorage('token') || ''
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器 
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response;
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default instance;
