import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from "../router"
import { get } from 'http';

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
    del_token(state) {
      state.accessToken = null
      state.is_login = false
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
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
        .post(state.api_url + "/oauth2/token",  {
          grant_type:'password',
          username: payload.username,
          password: payload.password
        })
        .then(function(response) {
          let result = response.data

          commit('set_token',  { access_token : result.access_token, refresh_token: result.refresh_token})
          commit('set_currentUser', {role: result.role, name:result.name})
          router.push('/')
        })
        .catch(err =>{ 
           console.log(err)
        }
        );
  },
 
}})
