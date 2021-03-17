<template>
  <the-header></the-header>
  <div class="container">
    <h1>Tasks</h1>
    <div class="tasks" v-if="tasks.length > 0">
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.name }}</td>
          <td>{{ task.status }}</td>
          <td>
            <form @change.prevent="updateStatus(task.id)">
              <select name="status" id="status" v-model="task.status">
                <option v-if="task.status !== 'todo' && task.status === 'progress'" value="todo">TODO</option>
                <option v-if="task.status === 'todo' || task.status === 'done'" value="progress">IN PROGRESS</option>
                <option v-if="task.status === 'progress'" value="done">DONE</option>
              </select>
            </form>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <p v-else>No tasks in the database</p>
  </div>
</template>

<script>
import TheHeader from "@/components/templates/TheHeader";

export default {
  components: {TheHeader},
  data() {
    return {
      newStatus: null,
    }
  },
  methods: {
    async updateStatus(id) {
      await this.$store.dispatch('updateStatus',
          {
            id: id,
            status: this.newStatus,
            my_id: this.currentUser.id
          })
    }
  },
  async beforeCreate() {
    await this.$store.dispatch('getTasks')
  },
  computed: {
    tasks() {
      return this.$store.getters.getAllTasks
    },
    currentUser() {
      return this.$store.getters.getCurrentUser
    }
  }
}
</script>

<style scoped>

</style>