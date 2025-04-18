import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useSettingStore } from '@/store/setting';
const settingStore = useSettingStore();
// 配置路由
// const routes: Array<RouteRecordRaw> = [
//     {
//         path: '/',
//         name: 'home',
//         component: () => import('../views//home/index.vue'),
//         meta: {},
//         children: [],
//     },
// ];

export const aboutRouter = {
    path: '/about',
    name: 'about',
    component: () => import('@/views/about/index.vue'),
    meta: {},
    children: []
} as RouteRecordRaw;

// 组合路由信息
// import.meta.glob 为 vite 提供的特殊导入方式
// 它可以将模块中全部内容导入并返回一个Record对象
// 默认为懒加载模式 加入配置项 eager 取消懒加载
const modules: Record<string, any> = import.meta.glob(['./modules/*.ts'], {
    eager: true
});
// 配置路由
const routes: Array<RouteRecordRaw> = [];
Object.keys(modules).forEach((key) => {
    const module = modules[key].default;
    routes.push(module);
});
routes.push(aboutRouter);

const router = createRouter({
    history: createWebHashHistory(),
    routes
});
// function isLogin() {
//     const token = sessionStorage.getItem('userInfo');
//     if (token) {
//         const objToken = JSON.parse(token);
//         return objToken.accessToken ? true : false;
//     } else {
//         return false;
//     }
// }
export function getTitle(name: string,routers:RouteRecordRaw[]){
    const names:string[] = []
    while(true){
        names.push(name)
        const currentRouterObj = routers.find((item) => item.name === name);
        const parentRouterObj = routers.find((item) => item.name === currentRouterObj?.meta?.parentRouter);
        if(parentRouterObj){
            name = parentRouterObj.name as string
            continue
        }else{
            break
        }
    }
    return names.reverse() 
}
const handleRouters=(currentName:string)=>{
const titleArr= getTitle(currentName,router.getRoutes())
settingStore.setTitle(titleArr)
console.log('titleArr ',titleArr)
}
const noStatusPage = ['/login', '/about'];
router.beforeEach(async (_to, _from, next) => {
    NProgress.start();
    const token = sessionStorage.getItem('userInfo');
    const userIsLogin = token ? true : false;
    if (userIsLogin || noStatusPage.includes(_to.path)) {
        next();
    } else {
        next('/login');
    }
    handleRouters(_to.name as string)
});
router.afterEach((_to) => {
    NProgress.done();
});
export default router;
