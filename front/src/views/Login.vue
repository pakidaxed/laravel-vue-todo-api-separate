<template>
<mini-header></mini-header>
  <login-form></login-form>
</template>

<script>
import LoginForm from "@/components/auth/LoginForm";
import MiniHeader from "@/components/templates/MiniHeader";
export default {
  components: {MiniHeader, LoginForm}
}
</script>

<style scoped>
h1 {
  color: crimson;
  text-align: center;
}
</style>