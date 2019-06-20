import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import VueCookies from 'vue-cookies'

import util from './utils'

import Kline from './kline'

Vue.use(util);

Vue.use(VueCookies);

Vue.use(Antd);

Vue.use(Kline);

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
