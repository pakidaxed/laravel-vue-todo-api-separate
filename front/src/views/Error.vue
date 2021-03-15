<template>
  <div class="container">
    <h1>ERROR, 404</h1>
  </div>
</template>

<script>
export default {

  beforeMount() {
    this.$router.push('/')
  }
}
</script>

<style scoped>

</style>