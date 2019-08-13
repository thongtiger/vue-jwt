<template>
    <div id="alluser">
 <ul id="example-1">
  <li -for="(value, name, index) in users">
    {{ item.message }}
  </li>
</ul>
    </div>
</template>

<script>
export default {
  name: "AllUserCompoent",
  datafunction () {
    return {
      users: []
    }
  },
  methods:{
    //   create_user(e){
    //     e.preventDefault();
    //     console.log("submit create user")
    //   }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
