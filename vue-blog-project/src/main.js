import './assets/main.css'
import "@styles/main.less"
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementUI from 'element-plus'
import App from './App.vue'
import router from './router'
import GlobalVueApiPlugin from '@utils/globalVueApi';
import NutUI from "@nutui/nutui";
import { IconFont } from '@nutui/icons-vue'
import "@nutui/nutui/dist/style.css";
const app = createApp(App)
const aa = 1; //测试
app.use(createPinia())
app.use(GlobalVueApiPlugin);
app.use(router)
app.use(ElementUI)
app.use(NutUI)
app.use(IconFont)
app.mount('#app')
