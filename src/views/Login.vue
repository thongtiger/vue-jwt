<template>
  <div>
    <h2>Login Page</h2>
    <form @submit="login">
      <div>
          <input placeholder="Your username" type="text" v-model="username">
      </div>
      <div>
          <input placeholder="Password" type="password" v-model="password">
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
  export default {
    data(){
      return {
        username : "",
        password : ""
      }
    },
    methods: {
      login: function () {
        this.$store.dispatch('login', { "username":this.username , "password":this.password }).then((response) => 
        console.log(response)
        // this.$router.push('/')
        
        ).catch(err => console.log(err))
      }
    }
  }
</script>