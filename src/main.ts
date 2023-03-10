import { createApp } from 'vue'
import router from './router'
import store from './store'
import directives from './directives'
import App from './App.vue'
import './assets/style/wind.css'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import zhCN from 'element-plus/es/locale/lang/zh-cn'

createApp(App)
    .use(directives)
    .use(router)
    .use(store)
    .use(ElementPlus, { locale: zhCN })
    .mount('#app')
