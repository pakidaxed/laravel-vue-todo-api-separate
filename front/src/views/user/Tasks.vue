<template>
  <h1>Tasks</h1>
</template>

<script>
import axios from "axios";

export default {
  name: "Tasks",
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