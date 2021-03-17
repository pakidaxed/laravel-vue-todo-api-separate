<template>
  <the-header></the-header>
  <div class="container">
    <h1>Dashboard</h1>
    <h1>All Tasks<span><router-link to="/admin/new">New task</router-link></span></h1>
    <p v-if="errors">{{ errors }}</p>
    <router-view></router-view>
    <div class="tasks" v-if="tasks.length > 0">
      <table>
        <thead>
        <tr>
          <th>Date <span @click="getSortedList()" class="sort">🔽</span></th>
          <th>Name</th>
          <th>Status <span @click="getSortedList('status')" class="sort">🔽</span></th>
          <th>User</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ convertToNormalDate(task.created_at) }}</td>
          <td>{{ task.name }}</td>
          <td>{{ task.status }}</td>
          <td>{{ convertToName(task.owner_id) }}</td>
          <td>
            <button @click="edit(task.id)">Edit</button>
            <button @click="remove(task.id)">Delete</button>
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
    return {}
  },
  methods: {
    getSortedList(sort = '') {
      this.$store.dispatch('getTasks', sort)
    },
    edit(id) {
      this.$router.push('/admin/edit/' + id)
      this.$store.dispatch('setCurrentTask', id)
      console.log('edit:', id)
    },
    remove(id) {
      confirm('Are you sure ?')
      this.$store.dispatch('deleteTask', id)
    },
    convertToName(id) {
      const filer = this.users.filter(x => x.id === id)
      const user = filer.find(x => x.id === id)
      return user.name + ' (' + user.email + ')'
    },
    convertToNormalDate(date) {
      const createdDate = new Date(date)
      return createdDate.getFullYear() + '-' +
          createdDate.getMonth() + '-' +
          createdDate.getDay() + ' ' +
          createdDate.getHours() + ':' +
          createdDate.getMinutes() + ':' +
          createdDate.getSeconds()
    }
  },
  async beforeCreate() {
    await this.$store.dispatch('getTasks')
  },
  computed: {
    errors() {
      return this.$store.getters.getErrors
    },
    tasks() {
      return this.$store.getters.getAllTasks
    },
    users() {
      return this.$store.getters.getAllUsers
    }
  }
}
</script>

<style scoped>
.sort:hover {
  cursor: pointer;
}
</style>