import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from "../router"
// import { get } from 'http';

Vue.prototype.$http = axios;

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    api_url: "http://localhost:1323",
    subject: "subject from vuex state",
    accessToken: localStorage.getItem('access_token') || '',
    refreshToken: localStorage.getItem('refresh_token') || '',
    currentUser: {
      role: "",
      name: "",
    },
    is_login: localStorage.getItem('access_token') ? true : false,
  },
  mutations: {
    login_success(state, data) {
      state.accessToken = data.access_token
      state.refreshToken = data.refresh_token
      state.is_login = true
      state.currentUser = { role: data.role, name: data.name }

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + data.access_token;
    },
    logout(state) {
      state.accessToken = null 
      state.refreshToken = null
      state.is_login = false
      state.currentUser = {}

      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      // remove the axios default header
      axios.defaults.headers.common['Authorization'] = null
      // delete axios.defaults.headers.common['Authorization']
    }
  },
  actions: {
    logout(state) {
      state.commit('logout')
    },
    login_password({ commit, dispatch }, payload) {
     axios
      .post( "/oauth2/token", {
          grant_type: 'password',
          ...payload
          // username: payload.username,
          // password: payload.password
        })
        .then(function (response) {
          commit('login_success', response.data)

          // refresh token
          setTimeout(() => {
            dispatch('login_token')
          }, parseInt(response.data.expires_in) *1000);

          router.push('/')
        })
        .catch(err => {
            console.log(err)
        });
    },
    login_token({ state, commit, dispatch }) {
      axios
        .post( "/oauth2/token", {
          grant_type: 'refresh_token',
          refresh_token: state.refreshToken
        })
        .then(function (response) {
          commit('login_success', response.data)

          
        // refresh token
          setTimeout(() => {
            dispatch('login_token')
          }, parseInt(response.data.expires_in) *1000);
        })
        .catch(err => {
          console.log(err)
            router.push('/login')
        });
    }
  }
})
