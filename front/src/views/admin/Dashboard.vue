<template>
  <h1>Dashboard</h1>
</template>

<script>
import axios from "axios";

export default {
  name: "Dashboard",
  methods: {
    logout() {
      // eslint-disable-next-line no-undef
      axios
          .get('http://localhost:8000/api/logout')
          .then(response => console.log(response))
    }
  },
  beforeMount() {
    this.logout()
  }
}
</script>

<style scoped>

</style>