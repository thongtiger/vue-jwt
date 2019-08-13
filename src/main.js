import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import  Axios  from  'axios'

Vue.config.productionTip = false
Vue.prototype.$http  =  Axios;

const  accessToken  =  localStorage.getItem('access_token')
if (accessToken) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] =  "Bearer "+accessToken
  // Vue.prototype.$http.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:1323';
  // Vue.prototype.$http.defaults.headers.common['Access-Control-Request-Method'] = '*'
}else{
  Vue.prototype.$http.defaults.headers.common['Authorization'] = null
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
