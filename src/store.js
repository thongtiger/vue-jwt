import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from "./router"

Vue.prototype.$http  =  axios;

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
      localStorage.setItem("access_token",token);
      axios.defaults.headers.common["Authorization"] = "Bearer "+token;
    },
    del_token(state) {
      state.accessToken = null
      state.is_login = false
      localStorage.removeItem("access_token")
      axios.defaults.headers.common['Authorization'] = null
    },
    set_currentUser(state, user){
      state.currentUser = user
    },
    del_currentUser(state){
      state.currentUser = {}
    }
  },
  actions: {
    logout(state){
      state.commit('del_token')
      state.commit('del_currentUser')
    },
    login({state,commit},payload){
      axios
        .post(state.api_url + "/login",  {
          username: payload.username,
          password: payload.password
        })
        .then(function(response) {
          let result = response.data

          commit('set_token',  result.token)
          commit('set_currentUser', {role: result.role, name:result.name})
          router.push('/home')
        })
        .catch(err =>{ 
           console.log(err)
        }
        );
  }
}})
