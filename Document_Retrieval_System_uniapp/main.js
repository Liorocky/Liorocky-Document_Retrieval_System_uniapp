import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import utils from './common/utils'

// uView组件
Vue.use(uView);
Vue.config.productionTip = false

Vue.prototype.$utils = utils

App.mpType = 'app'

const app = new Vue({
    ...App
})

// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/common/http.interceptor.js'
Vue.use(httpInterceptor, app)

// http接口API集中管理引入部分
import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)

app.$mount()
