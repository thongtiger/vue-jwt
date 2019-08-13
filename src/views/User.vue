<template>
  <div class="user">
    <h1>User page</h1>
    <CreateUser />
  </div>
</template>

<script>
// @ is an alias to /src
import CreateUser from "@/components/user/CreateUser.vue";

export default {
  name: "user",
  components: {
    CreateUser
  },
  methods: {

  }
};
</script>
