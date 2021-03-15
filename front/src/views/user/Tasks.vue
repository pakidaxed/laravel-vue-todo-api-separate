<template>
  <the-header></the-header>
  <div class="container">
    <h1>Tasks</h1>
    <div class="tasks" v-if="tasks">
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
import axios from "axios";
import TheHeader from "@/components/templates/TheHeader";

export default {
  components: {TheHeader},
  data() {
    return {
      tasks: null
    }
  },
  methods: {
    getTasks() {
      axios
          .get('http://localhost:8000/api/tasks')
          .then(response => this.tasks = response.data)
    }
  },
  beforeMount() {
    this.getTasks()
  }
}
</script>

<style scoped>

</style>