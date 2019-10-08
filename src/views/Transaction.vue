<template>
  <div></div>
</template>

<script>

export default {
    name:'transaction',
     methods: {
        async get401() {
      let res = await this.$http.get('/401', { params: { class: this.cls}})
      console.log(res.data)
    }
    },
    mounted(){
      console.log('xxx')
      this.get401()
    }
}
</script>
