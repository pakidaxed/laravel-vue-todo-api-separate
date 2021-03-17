<template>
<h1>edit task</h1>
  <p>{{ $route.params.id }}</p>
  <form @submit.prevent="editTask">
    Name: <input type="text" name="name" id="name" v-model="task.name">
    User: <select name="owner" id="owner" v-model="task.owner_id">
    <option value="null" disabled>Select User</option>
    <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }} ({{ user.email }})</option>
  </select>
    Status: <select name="status" id="status" v-model="task.status">
      <option value="todo">TODO</option>
      <option value="progress">IN PROGRESS</option>
      <option value="done">DONE</option>
    </select>
    <button>Update</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      users: null,
    }
  },
  methods: {
    async editTask() {
      await this.$store.dispatch('updateTask', this.task)
    }
  },
  beforeMount() {
    this.users = this.$store.getters.getAllUsers
  },
  computed: {
    task() { return this.$store.getters.getCurrentTask}
  }
}
</script>

<style scoped>

</style>