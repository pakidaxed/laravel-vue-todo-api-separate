<template>
  <div class="container">
    <h1>ERROR, 404</h1>
  </div>
</template>

<script>
export default {
  beforeMount() {
    setTimeout(() => this.$router.push('/'), 1000)
  }
}
</script>

<style scoped>

</style>