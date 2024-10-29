import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
import { getMessageInfo } from './status';

interface BaseResponse<T = any> {
    code: number | string;
    message: string;
    data: T;
    status?: number | string;
}
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_DEV_USE_MOCK
        ? import.meta.env.VITE_APP_MOCK_BASEURL
        : import.meta.env.VITE_APP_API_BASEURL,
    timeout: 15000
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
        if (response.status === 200) {
            const res = response.data;
            if (res.code !== 0) {
                ElMessage({
                    message: res.message || 'Error',
                    type: 'error'
                });
                return Promise.reject(new Error)
            }else{
                return res;
            }
        }
        ElMessage({
            message: getMessageInfo(response.status),
            type: 'error'
        });
        return response;
    },
    // 请求失败
    (error: any) => {
        const { response } = error;
        if (response) {
            ElMessage({
                message: getMessageInfo(response.status),
                type: 'error'
            });
            return Promise.reject(response.data);
        }
        ElMessage({
            message: '网络连接异常,请稍后再试!',
            type: 'error'
        });
    }
);

export default service;