import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from "./router"

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    api_url: "http://localhost:3000",
    subject: "subject from vuex state",
    accessToken: localStorage.getItem('access_token') || '',
    currentUser: {
      role:"",
      name:"",
    },
    is_login: localStorage.getItem('access_token') ?true:false,
  },
  mutations: {
    set_token(state, token) {
      state.accessToken = token
      state.is_login = true
    },
    del_token(state) {
      state.is_login = false
      state.accessToken = null
    },
    set_currentUser(state, user){
      state.currentUser = user
    }
  },
  actions: {
    login_success( {commit }, data) {
      localStorage.setItem("access_token", data.token);
      axios.defaults.headers.common["Authorization"] = data.token;
      commit('set_token',  data.token)
      commit('set_currentUser', {role: data.role, name:data.name})
      router.push('/')
    },
    logout(state){
      localStorage.removeItem("access_token")
      state.commit('del_token')
    }
  }
})
