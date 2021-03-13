<template>
<h1>Users (admin)</h1>
</template>

<script>
import axios from "axios";

export default {
name: "Users",
  beforeMount() {

  axios
  .get('http://localhost:8000/api/admin/dashboard')
      .then(response => console.log(response))
}
}
</script>

<style scoped>

</style>