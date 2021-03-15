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
      setTimeout(() => this.$router.push('/'), 1000)
    },
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
  height: 300px;
  justify-content: center;
  align-items: center;
}
</style>