<template>
  <div class="createUser">
    <form action="#" @submit="create_user">
      <div class="container">
        <h1>Create User</h1>
        <p>Please fill in this form to create an account.</p>
        <hr />

        <label for="email">
          <b>Username</b>
        </label>
        <input type="text" placeholder="Enter Username" name="username" required />

        <label for="psw">
          <b>Password</b>
        </label>
        <input type="password" placeholder="Enter Password" name="password" required />

        <hr />
        <p>
          By creating an account you agree to our
          <a href="#">Terms & Privacy</a>.
        </p>

        <button type="submit" class="registerbtn" >Create</button>
      </div>

      <div class="container signin">
        <p>
          Already have an account?
          <a href="#">Sign in</a>.
        </p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "CreateUserCompoent",
  methods:{
      create_user(e){
        e.preventDefault();
        console.log("submit create user")
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
