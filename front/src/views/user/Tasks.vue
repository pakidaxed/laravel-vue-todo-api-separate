<template>
  <the-header></the-header>
  <div class="container">
    <h1>Tasks</h1>
    <div class="tasks" v-if="tasks > 0">
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.name }}</td>
          <td>{{ task.status }}</td>
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
      tasks: null
    }
  },
  // methods: {
  //   getTasks() {
  //     this.tasks = this.$store.dispatch('getTasks')
  //   }
  // },
  // beforeCreate() {
  //   this.getTasks()
  // }
}
</script>

<style scoped>

</style>