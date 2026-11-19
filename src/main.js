import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import App from './App.vue'
import router from './router.js'
import { reveal } from './reveal.js'
import './styles.css'

createApp(App).use(router).use(ElementPlus).directive('reveal', reveal).mount('#app')
