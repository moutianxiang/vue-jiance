import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './route'
import './plugins/element.js'
import axios from 'axios'

// axios.defaults.baseURL = 'http://localhost:8880'
axios.defaults.baseURL = 'http://60.205.186.238:8880'
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
