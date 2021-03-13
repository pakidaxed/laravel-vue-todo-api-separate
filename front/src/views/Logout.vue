<template>
  <div class="logout-box">
    <h1>You are being logged out...</h1>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout')
      setTimeout(this.redirect, 2000)
    },
    redirect() {
      this.$router.push('/')
    }
  },
  beforeMount() {
    this.logout()
  }
}
</script>

<style scoped>
.logout-box {
  display: flex;
  width: 100%;
  height: 500px;
  justify-content: center;
  align-items: center;
}
</style>