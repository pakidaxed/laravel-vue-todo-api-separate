<template>
  <h1>Dashboard</h1>
</template>

<script>

export default {
  name: "Dashboard",
  methods: {

  },
  beforeMount() {
    this.$store.dispatch('isAlive')
  }
}
</script>

<style scoped>

</style>