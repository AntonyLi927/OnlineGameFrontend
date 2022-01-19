import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import VueRouter from 'vue-router'
import store from './store/main'
import Vuex from 'vuex'
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router,
  store: store,
}).$mount('#app')
