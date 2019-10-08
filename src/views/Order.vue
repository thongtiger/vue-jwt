<template>
  <div>
      <a href="#" @click="showFormNewOrder">New Order</a>
      <form  v-if="form_neworder">
          <h3>New Order</h3>
      </form>
  </div>
</template>

<script>
export default {
 data(){
    return{
      form_neworder:false,
      items:Array,
    }
  },
  components: {
  },
  methods: {
    findAll(){
       this.$http.get("/protected")
        .then(response =>{
          if(response.data.success){
            this.items = response.data["data"]
          }
        })
        .catch(err => console.log(err));
    },
    showFormNewOrder(){
      this.form_neworder = true;
    }
  },
  mounted(){
  }
}
</script>

<style>

</style>