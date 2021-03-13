<template>
  <the-header></the-header>
  <h1>Tasks</h1>
  <router-link to="/logout">Logout</router-link>
</template>

<script>
import axios from "axios";
import TheHeader from "@/components/templates/TheHeader";

export default {
  name: "Tasks",
  components: {TheHeader},
  methods: {
    temp() {
      // eslint-disable-next-line no-undef
      axios
          .get('http://localhost:8000/api/temp')
          .then(response => console.log(response.data))
    }
  },
  beforeMount() {
    this.temp()
  }
}
</script>

<style scoped>

</style>