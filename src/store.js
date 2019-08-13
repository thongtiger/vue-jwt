import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from "./router"

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    subject: "subject from vuex state",
    accessToken: localStorage.getItem('access_token') || '',
    currentUser: {},
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
  },
  actions: {
    login_success(state, token) {
      localStorage.setItem("access_token", token);
      axios.defaults.headers.common["Authorization"] = token;
      state.commit('set_token', token)
      router.push('/')
    },
    logout(state){
      localStorage.removeItem("access_token")
      state.commit('del_token')
    }
  }
})
