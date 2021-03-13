<template>
  <router-view/>
  <div class="store">
    {{ $store.state }}
  </div>
</template>
<script>

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
a, a:visited, a:link {
  padding: 0 10px;
  text-decoration: none;
  color: crimson;
}

a:hover {
  color: #800c23;
}

</style>
