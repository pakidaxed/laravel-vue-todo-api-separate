<template>
    <router-view/>
  <div class="store">
    {{ $store.state }}
  </div>
</template>

<script>


export default {
  created() {
    this.$store.dispatch('isAlive')
  }
}
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

body, html {
  margin: 0;
  padding: 0;
  font-family: Montserrat, sans-serif;
}

* {
  box-sizing: border-box;
}

.container {
  width: 90%;
  margin: 0 auto;
}

a, a:visited, a:link {
  padding: 0 10px;
  text-decoration: none;
  color: crimson;
}

a:hover {
  color: #800c23;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background-color: crimson;
  color: white;
  font-size: 1.3rem;
}
th, tr, td {
  border: 1px solid black;
  padding: 15px 5px;
}

</style>
