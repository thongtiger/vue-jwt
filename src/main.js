import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import  axios  from  'axios'

Vue.config.productionTip = false
Vue.prototype.$http  =  axios;

const  accessToken  =  localStorage.getItem('access_token')
if (accessToken) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] =  "Bearer "+accessToken
  Vue.prototype.$http.defaults.headers.common['Accept'] =  "application/json"
}else{
  Vue.prototype.$http.defaults.headers.common['Authorization'] = null
}

axios.interceptors.response.use(
  (response) => {
      return response
  },
  async (error) => {
      if (error.request.status == 401) {
        console.log('interceptors 401')
        store.dispatch("login_token")
        console.log('interceptors refresh_token')
      }
      // If error was not 401 just reject as is
      throw error
  }
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
