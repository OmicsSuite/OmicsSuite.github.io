import { createApp } from 'vue'
import { ElBacktop } from 'element-plus/es/components/backtop/index.mjs'
import { ElDialog } from 'element-plus/es/components/dialog/index.mjs'
import { ElDrawer } from 'element-plus/es/components/drawer/index.mjs'
import { ElDropdown } from 'element-plus/es/components/dropdown/index.mjs'
import { ElEmpty } from 'element-plus/es/components/empty/index.mjs'
import { ElImage } from 'element-plus/es/components/image/index.mjs'
import { ElInput } from 'element-plus/es/components/input/index.mjs'
import { ElPagination } from 'element-plus/es/components/pagination/index.mjs'
import { ElSelect } from 'element-plus/es/components/select/index.mjs'
import 'element-plus/es/components/backtop/style/css.mjs'
import 'element-plus/es/components/dialog/style/css.mjs'
import 'element-plus/es/components/drawer/style/css.mjs'
import 'element-plus/es/components/dropdown/style/css.mjs'
import 'element-plus/es/components/empty/style/css.mjs'
import 'element-plus/es/components/image/style/css.mjs'
import 'element-plus/es/components/input/style/css.mjs'
import 'element-plus/es/components/pagination/style/css.mjs'
import 'element-plus/es/components/select/style/css.mjs'
import 'element-plus/theme-chalk/dark/css-vars.css'
import App from './App.vue'
import router from './router.js'
import { reveal } from './reveal.js'
import './styles.css'

const app = createApp(App)
app.use(router)
  .use(ElBacktop)
  .use(ElDialog)
  .use(ElDrawer)
  .use(ElDropdown)
  .use(ElEmpty)
  .use(ElImage)
  .use(ElInput)
  .use(ElPagination)
  .use(ElSelect)
  .directive('reveal', reveal)
  .mount('#app')
