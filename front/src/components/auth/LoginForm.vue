<template>
  <div class="container">
    <div class="form-box">
      <form @submit.prevent="login">
        <div class="form-control">
          <label for="email">E-mail:</label>
          <input type="email" name="email" id="email" v-model="loginData.email"/>
        </div>
        <span class="error" v-if="error.email">{{ error.email }}</span>
        <div class="form-control">
          <label for="password">Password:</label>
          <input type="password" name="password" id="password" v-model="loginData.password"/>
        </div>
        <span class="error" v-if="error.password">{{ error.password }}</span>
        <div class="form-actions">
          <div class="loading" v-if="loading"><img src="../../assets/loading.gif" alt="loading"/></div>
          <button v-else>Login</button>
          <router-link to="/registration">Registration</router-link>
        </div>
      </form>
    </div>
    <div class="error" v-if="error.main">
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
      error: {
        main: null,
        email: null,
        password: null
      }
    }
  },
  methods: {
    login() {
      this.loading = true
      this.$store.dispatch('login', this.loginData)
      setTimeout(() => {
        if (this.$store.getters.getErrors) {
          this.error.main = 'Login failed'
          this.error = this.$store.getters.getErrors
          this.loading = false
        }
      }, 400)
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