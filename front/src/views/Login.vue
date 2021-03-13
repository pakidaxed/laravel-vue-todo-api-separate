<template>
<h1>TODO APP</h1>
  <login-form></login-form>
</template>

<script>
import LoginForm from "@/components/auth/LoginForm";
export default {
name: "Login",
  components: {LoginForm}
}
</script>

<style scoped>
h1 {
  color: crimson;
  text-align: center;
}
</style>