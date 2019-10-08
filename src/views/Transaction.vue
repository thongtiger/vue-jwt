<template>
  <div></div>
</template>

<script>
export default {
  name: "transaction",
  methods: {
     get401() {
      let res =  this.$http.get("/401", { params: { class: this.cls } });
      console.log(res.data);
    }
  },
  mounted() {
    console.log("xxx");
    this.get401();
  }
};
</script>
