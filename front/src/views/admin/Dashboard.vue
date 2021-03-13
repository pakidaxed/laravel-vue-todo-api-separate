<template>
  <the-header></the-header>
  <h1>Dashboard</h1>
</template>

<script>

import TheHeader from "@/components/templates/TheHeader";
export default {
  name: "Dashboard",
  components: {TheHeader},
  methods: {

  },
  beforeMount() {
    this.$store.dispatch('isAlive')
  }
}
</script>

<style scoped>

</style>