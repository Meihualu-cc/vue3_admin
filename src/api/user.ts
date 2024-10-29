// import { post,get } from '@/http/request';

// export type LoginRequest = {
//     username: string;
//     password: string;
// };
// // 刷新登录信息需要的参数
// export type reLoginRequest = {
//     accessToken: string;
// };
// export type LoginResponse = {
//     username: string;
//     roles: string[];
//     accessToken: string;
// };
// // 定义的接口
// export const userLogin = async (data?: LoginRequest) => {
//     return post<LoginResponse>({}, '/login', data);
// };

// export const refreshUserInfo = async (data?: reLoginRequest) => {
//     return post<LoginResponse>({}, '/getUserInfo', data);
// };

// //获取所有用户
// export const getUserList = async () => {
//     return get({}, '/getUserList');
// };
import service from '@/http/request';

export type LoginRequest = {
    username: string;
    password: string;
};
// 刷新登录信息需要的参数
export type reLoginRequest = {
    accessToken: string;
};
export type LoginResponse = {
    username: string;
    roles: string[];
    accessToken: string;
};
// 定义的接口
export const userLogin = async (data?: LoginRequest) => {
    return service.post<LoginResponse>('/login', data);
};

export const refreshUserInfo = async (data?: reLoginRequest) => {
    return service.post<LoginResponse>( '/getUserInfo', data);
};

//获取所有用户 
export const getUserList = async () => {
    return service.get( '/getUserList');
};