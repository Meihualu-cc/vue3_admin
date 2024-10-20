import axios from 'axios';
import type {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';

const service: AxiosInstance = axios.create({
  baseURL: Boolean(import.meta.env.VITE_APP_USE_MOCK)
  ? import.meta.env.VITE_APP_MOCK_BASEURL
  : import.meta.env.VITE_APP_API_BASEURL,
    timeout: 15000,
  });

// axios实例拦截请求
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// axios实例拦截响应
service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default service