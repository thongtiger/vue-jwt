<template>
  <div id="app">
    <p>isLoggedIn = {{is_login}}</p>
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/user">User</router-link>|
      <router-link to="/agent">Agent</router-link>
      <a href="#" v-if="is_login" @click="logout" class="router-link-exact-active router-link-active">Logout</a>
    </div>
    <router-view />
  </div>
</template>

<script>
import store from "./store.js";
import router from "./router";

export default {
  computed: {
     is_login () {
      return store.state.is_login;
    }
  },
  methods: {
    logout(e){
      e.preventDefault();
      store.dispatch('logout')
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
