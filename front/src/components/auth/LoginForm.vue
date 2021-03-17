<template>
  <div class="container">
    <div class="form-box">
      <form @submit.prevent="login">
        <div class="form-control">
          <label for="email">E-mail:</label>
          <input type="email" name="email" id="email" v-model="loginData.email"/>
        </div>
        <span class="error" v-if="error">{{ error.email }}</span>
        <div class="form-control">
          <label for="password">Password:</label>
          <input type="password" name="password" id="password" v-model="loginData.password"/>
        </div>
        <span class="error" v-if="error">{{ error.password }}</span>
        <div class="form-actions">
          <div class="loading" v-if="loading"><img src="../../assets/loading.gif" alt="loading"/></div>
          <button v-else>Login</button>
          <router-link to="/registration">Registration</router-link>
        </div>
      </form>
    </div>
    <div class="error" v-if="error">
      <p>{{ error.main }}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: "LoginForm",
  data() {
    return {
      loading: false,
      loginData: {
        email: null,
        password: null
      },
      error: null,

    }
  },
  methods: {
    async login() {
      this.loading = true
      await this.$store.dispatch('login', this.loginData)
      this.error = this.$store.getters.getErrors
      this.loading = false
    },
  }
}
</script>

<style scoped>
.form-box {
  width: 400px;
  margin: 0 auto;
}

.form-control {
  display: flex;
  justify-content: center;
}

.error {
  color: crimson;
}

label {
  width: 100%;
}

input {
  width: 100%;
}
</style>