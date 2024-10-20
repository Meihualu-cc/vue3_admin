import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import './styles/index.less'
import 'normalize.css/normalize.css'//浏览器样式重制，解决浏览器兼容问题
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
