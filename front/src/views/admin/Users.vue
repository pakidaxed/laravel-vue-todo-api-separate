<template>
  <the-header></the-header>
  <div class="container">
    <h1>All Users</h1>
    <p v-if="errors">{{ errors }}</p>
    <div class="tasks" v-if="users > 0">
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>

            <button @click="remove(user.id)">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <p v-else>No users in the database</p>
  </div>

</template>

<script>

import TheHeader from "@/components/templates/TheHeader";

export default {
  components: {TheHeader},
  methods: {
    async remove(id) {
      await this.$store.dispatch('deleteUser', id)
    }
  },
  computed: {
    users() {
      return this.$store.getters.getAllUsers
    },
    errors() {
      return this.$store.getters.getErrors
    }
  }

}
</script>

<style scoped>

</style>