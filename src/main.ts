//  import './assets/main.css'

import {createPinia} from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

import '@/styles/common.scss'
import {lazyPlugin} from '@/directives'
const pinia=createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
app.use(lazyPlugin)



