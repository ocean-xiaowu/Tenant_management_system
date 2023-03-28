import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 引入echars
const echarts = require('echarts');
Vue.prototype.$echarts = echarts

//全局样式
import './assets/css/global.css'
import './assets/font/iconfont.css'
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')