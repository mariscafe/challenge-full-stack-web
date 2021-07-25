<template>
  <div class="welcome">
    <h1>Grupo A Educação</h1>
    <h2>{{ msg }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  props: {
    msg: String
  }
}
</script>
