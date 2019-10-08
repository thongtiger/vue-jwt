<template>
  <div>
      <a href="#" @click="showFormNewOrder">New Order</a>
      <form  v-if="form_neworder">
          <h3>New Order</h3>
      </form>
  </div>
</template>

<script>
import axios from 'axios'

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
       axios.get("http://localhost:1323/protected")
        .then(response =>{
          // console.log(response.data)
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
    this.findAll()
  }
}
</script>

<style>

</style>