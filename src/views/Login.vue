<template>
  <div>
    <h2>Login</h2>
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
  </div>
</template>

<script>
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
      this.$store.dispatch("login",  {
          username: this.username,
          password: this.password
        })
    }
  }
};
</script>