import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueAxios from 'vue-axios'
import axios from 'axios'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import VueCookies from 'vue-cookies'

Vue.use(VueCookies)

Vue.use(Antd)

Vue.config.productionTip = false

Vue.use(VueAxios,axios);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
