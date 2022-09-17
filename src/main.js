import { createApp } from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';
import { registerComponent } from './component'


const app = createApp(App)
registerComponent(app)
app.mount('#app')
