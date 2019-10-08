import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from "../router"
// import { get } from 'http';

Vue.prototype.$http  =  axios;

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    api_url: "http://localhost:1323",
    subject: "subject from vuex state",
    accessToken: localStorage.getItem('access_token') || '',
    currentUser: {
      role:"",
      name:"",
    },
    is_login: localStorage.getItem('access_token') ?true:false,
  },
  mutations: {
    set_token(state, data) {
      state.accessToken = data.access_token
      state.is_login = true
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      axios.defaults.headers.common["Authorization"] = "Bearer "+ data.access_token;
    },
    set_currentUser(state, user){
      state.currentUser = user
    },
    login_success(state, data){
      state.accessToken = data.access_token
      state.is_login = true
      state.currentUser = {role: data.role, name:data.name}

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      axios.defaults.headers.common["Authorization"] = "Bearer "+ data.access_token;
    },
    logout(state){
      state.accessToken = null
      state.is_login = false
      state.currentUser = {}

      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      axios.defaults.headers.common['Authorization'] = null
    }
  },
  actions: {
    logout(state){
      state.commit('logout')
    },
    login({state,commit},payload){
      axios
        .post(state.api_url + "/oauth2/token",  {
          grant_type:'password',
          username: payload.username,
          password: payload.password
        })
        .then(function(response) {
          commit('login_success', response.data)
          router.push('/')
        })
        .catch(err =>{ 
           console.log(err)
        });
  },
 
}})
