import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

// document : https://github.com/axios/axios
axios.defaults.baseURL = store.state.api_url;
axios.defaults.headers.common['Authorization'] = 'Bearer '+(store.state.accessToken)? store.state.accessToken : null;
axios.defaults.headers.common['Accept'] =  "application/json"
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  if (error.request.status == 401) {
    console.log('interceptors 401')
    store.dispatch("login_token")
    console.log('interceptors refresh_token')
  }
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
