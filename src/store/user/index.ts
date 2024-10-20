import { defineStore } from 'pinia';
import pinia from '@/store';
import { userLogin, refreshUserInfo } from '@/api/user';
import router from '@/router';

export interface UserState {
    username: string;
    accessToken: string;
    refreshToken?: string;
    roles: Array<string>;
}
export const useUserStoreHook = defineStore('userInfo', {
    state: (): UserState => ({
        username: 'ccc',
        accessToken: '',
        roles: ['common']
    }),
    getters: {},
    actions: {
        storeUserLogin(data) {
            return userLogin(data).then((res) => {
                this.username = res.username;
                this.roles = res.roles;
                this.accessToken = res.accessToken;
                return res;
            });
        },
        logout() {
            sessionStorage.removeItem('userInfo');
            this.accessToken = '';
            router.push('/login');
        },
        stroeRefreshUserInfo() {
            if (this.username == '大伟' && this.accessToken != '') {
                refreshUserInfo({
                    accessToken: this.accessToken
                })
                    .then((res) => {
                        this.username = res.username;
                        this.roles = res.roles;
                        this.accessToken = res.accessToken;
                    })
                    .catch(() => {
                        this.accessToken = '';
                    });
            }
        }
    },
    // 进行持久化存储
  persist: {
    // 本地存储的名称
    key: 'userInfo',
    //保存的位置
    storage:sessionStorage, //localstorage
  },
    // persist: {
    //     key: 'userInfo',
    //     storage: sessionStorage,
    //     paths: ['accessToken']
    // }
});
export function useUserStore() {
    return useUserStoreHook(pinia);
}
