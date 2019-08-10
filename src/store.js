import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: localStorage.getItem('access_token') || '',
    currentUser: {},
    isLoggedIn: false,
  },
  mutations: {
    set_token(state, newtoken) {
      state.accessToken = newtoken
      state.isLoggedIn = true
    },
    logout(state) {
      state.accessToken = ''
      state.isLoggedIn = false
    }
  },
  actions: {
    login({ commit }, auth) {
      axios({ method: "GET", url: "http://localhost:1323" }).then(result => {
        console.log(result)
      }, error => {
        console.error(error);
      });

      axios.post("http://localhost:1323/login", { username: auth.username, password: auth.password })
        .then(function (response) {
          console.log(response.data)
          const token = response.data.token
          commit("set_token", token)
          localStorage.setItem('access_token', token)
          // Add the following line:
          axios.defaults.headers.common['Authorization'] = token
        })
        .catch(function (error) {
          console.log(error)
        });
    },
    logout({ commit }) {
      commit('logout')
      localStorage.removeItem('access_token')
      delete this.axios.defaults.headers.common['Authorization']
    }

  }
})
