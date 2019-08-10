<template>
  <div id="app">
    <p>isLoggedIn = {{isLoggedIn}}</p>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <router-link to="/login" v-if="isLoggedIn" @click="logout">Logout</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
import store from "./store.js";
import axios from 'axios'

  export default {
    computed : {
        isLoggedIn: ()=> {
          return store.state.isLoggedIn;
        }
    },
    methods: {
     
    },
    mounted () {
       axios({ method: "GET", "url": "https://httpbin.org/ip" }).then(result => {
          console.log(result)
      }, error => {
          console.error(error);
      });
   

      axios({ method: "GET", "url": "http://127.0.0.1:1323" }).then(result => {
          console.log(result)
      }, error => {
          console.log(error);
      });

       axios.post( "http://localhost:1323/login", { username: "admin", password: "1234" })
        .then(function (response) {
          console.log(response.data)
          const token = response.data.token
       
          localStorage.setItem('access_token', token)
          // Add the following line:
          axios.defaults.headers.common['Authorization'] = token
        }).catch( error => {
          console.log(error);
      });
}
  }
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
