<template>
  <div class="header">
    <div class="logo">
      <h1>TODO APP</h1>
    </div>
    <div class="header-nav">
      <nav>
        <router-link v-if="!isAdmin" to="/tasks">My Tasks</router-link>
        <router-link v-if="isAdmin" to="/admin">All Tasks</router-link>
        <router-link v-if="isAdmin" to="/admin/users">Users</router-link>
        <router-link to="/logout">Logout</router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAdmin: false
    }
  },
  beforeMount() {
    this.isAdmin = this.$store.getters.getAdmin
  }

}
</script>

<style scoped>
.header {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid crimson;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
}

</style>