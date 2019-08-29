<template>
  <div id="app">
    <!-- <p>isLoggedIn = {{is_login}}</p> -->
    <!-- <p>user = {{currentUser}}</p> -->
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/order">Order</router-link>|
      <router-link to="/transaction">Transaction</router-link>
      <router-link to="/user">User</router-link>
      <a href="#" v-if="is_login" @click="logout" class="router-link-exact-active router-link-active">Logout</a>
          
    </div>
    <router-view />
  </div>
</template>

<script>
// import store from "./store.js";
import router from "./router";
// import axios from "axios";

export default {
  computed: {
     is_login () {
      return this.$store.state.is_login;
    },
     currentUser () {
      return this.$store.state.currentUser;
    },
  

  },
  methods: {
    logout(e){
      e.preventDefault();
      this.$store.dispatch('logout')
      router.push("/login")
    }
  },
  mounted() {
      
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
