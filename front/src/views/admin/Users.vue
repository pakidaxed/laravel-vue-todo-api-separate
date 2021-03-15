<template>
  <the-header></the-header>
  <div class="container">
    <h1>Users (admin)</h1>
  </div>
</template>

<script>
import axios from "axios";
import TheHeader from "@/components/templates/TheHeader";

export default {
  name: "Users",
  components: {TheHeader},
  beforeMount() {

    axios
        .get('http://localhost:8000/api/admin/dashboard')
        .then(response => console.log(response))
  }
}
</script>

<style scoped>

</style>