<template>
  <the-header></the-header>
  <div class="container">
    <h1>Dashboard</h1>
    <h1>All Tasks</h1>
    <div class="tasks" v-if="tasks">
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>User</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.name }}</td>
          <td>{{ task.status }}</td>
          <td>{{ task.owner_id }}</td>
          <td>Edit, Delete</td>
        </tr>
        </tbody>
      </table>
    </div>
    <p v-else>No tasks in the database</p>
  </div>
</template>

<script>

import TheHeader from "@/components/templates/TheHeader";
import axios from "axios";

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
          .then(response => {
            if (response.data.length > 0) {
              this.tasks = response.data
            }
          })
    }
  },
  beforeMount() {
    this.getTasks()
  }
}
</script>

<style scoped>

</style>