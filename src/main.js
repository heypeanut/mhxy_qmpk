import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/index'
import './registerServiceWorker'
import fastclick from 'fastclick'

import '@/common/scss/reset.scss'

Vue.config.productionTip = false

fastclick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
