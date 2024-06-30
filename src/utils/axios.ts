// axiosConfig.js

import axios from 'axios';
import { loadDataFromStorage } from '@/utils/util';
import { createPinia, setActivePinia } from 'pinia';
import { useAuthStore } from '@/store/auth';
import { HttpStatus } from '@/types/httpStatus';
import { createDiscreteApi } from 'naive-ui';

setActivePinia(createPinia());

const { loadingBar } = createDiscreteApi(['loadingBar'])

// 创建一个 Axios 实例
const instance = axios.create({
  // baseURL: 'https://api.ldjun.cn:9000', // 设置基础URL，根据你的实际情况修改
  baseURL: import.meta.env.VITE_APP_BASE_API, // 设置基础URL，根据你的实际情况修改
  timeout: 30000, // 请求超时时间（毫秒）
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在请求发送之前做些什么
    // 例如，可以在请求头中添加认证信息
    const token = loadDataFromStorage('token') || ''
    config.headers.Authorization = `Bearer ${token}`;
    loadingBar.start()
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    loadingBar.error()
    return Promise.reject(error);
  }
);

// 响应拦截器 
instance.interceptors.response.use(
  (response) => {
    // TOKENN 过期
    if (response.data.code == HttpStatus.INTERNAL_SERVER_ERROR && response.data.message == 'Unauthorized') {
      const authStore = useAuthStore(); // 使用Pinia的store
      authStore.logout(); // 调用logout方法
    }else if (response.data.code == HttpStatus.INTERNAL_SERVER_ERROR){
      const { message } = createDiscreteApi(['message'])
      message.error(response.data.message)
    }
    loadingBar.finish()
    // 对响应数据做点什么
    return response;
  },
  (error) => {
    // 对响应错误做点什么
    loadingBar.error()
    return Promise.reject(error);
  }
);

export default instance;
