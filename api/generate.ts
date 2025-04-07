import axios from 'axios';
import type { 
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError 
} from 'axios';
// 创建并导出 instance（统一在开头导出）
export const request: AxiosInstance = axios.create({
  timeout: 300000,
});

// 请求拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
