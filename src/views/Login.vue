<template>
  <div>
    <h2>Login Page</h2>
    <form @submit="login">
      <div>
        <input placeholder="Your username" type="text" v-model="username" />
      </div>
      <div>
        <input placeholder="Password" type="password" v-model="password" />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
    <p>username {{username}}</p>
    <p>password {{password}}</p>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store";
import router from "../router";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login: function(e) {
      e.preventDefault();
      axios
        .post(store.state.api_url + "/login", {
          username: this.username,
          password: this.password
        })
        .then(function(response) {
          router.push("/home");
          store.dispatch("login_success",  {
            token: response.data.token,
            name: response.data.name,
            role: response.data.role
          });
        })
        .catch(err => console.log(err));
    }
  }
};
</script>