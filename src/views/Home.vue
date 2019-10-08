<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <!-- <button @click="goBack()">go bank</button> -->
    <h1>Home page</h1>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import axios from 'axios'

export default {
  name: "home",
  components: {
    // HelloWorld
  },
  computed: {
    //  accessToken () {
    //   return this.$store.state.accessToken;
    // },
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    getProtected(){
       axios.get("http://localhost:1323/protected")
        .then(response =>{
          if(response.data){
            console.log(response.data)
          }
        })
        .catch(err => console.log(err));
    }
  },
   mounted(){
    this.getProtected()
  }
};
</script>
