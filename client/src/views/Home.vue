<template>
  <div class="home">
    <img alt="grupoA logo" src="../assets/logo.png">
    <Welcome msg="A maior plataforma de educação do Brasil"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Welcome from '@/components/Welcome.vue'

export default {
  name: 'Home',
  components: {
    Welcome
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home{
  text-align: center;
}
</style>