import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/fafonts/index.css'
import router from './router'
import store from './store'
import 'default-passive-events'

const app = createApp(App);
app.use(store).use(router).use(ElementPlus).mount('#app')
