<template>
  <h1>Please enter task info</h1>
  <form @submit.prevent="createTask">
    Name: <input type="text" name="name" id="name" v-model="task.name">
    User: <select name="owner" id="owner" v-model="task.user">
    <option value="null" selected disabled>Select User</option>
    <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }} ({{ user.email }})</option>
  </select>
    <button>Add</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      users: null,
      task: {
        name: null,
        user: null
      }
    }
  },
  methods: {
    async createTask() {
      await this.$store.dispatch('createTask', this.task)
    }
  },
  mounted() {
    this.users = this.$store.getters.getAllUsers
  }
}
</script>

<style scoped>

</style>