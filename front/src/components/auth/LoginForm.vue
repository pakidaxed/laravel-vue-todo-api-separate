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
          <button>Login</button>
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
import axios from "axios";

export default {
  name: "LoginForm",
  data() {
    return {
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
      axios
          .post('http://localhost:8000/api/login', {
            "email": this.loginData.email,
            "password": this.loginData.password
          })

          .then(response => {
            if (!response.data.success) {
              this.error.email = response.data.email ?? null
              this.error.password = response.data.password ?? null
            } else {
              this.$store.commit('setAuthentication', {state: true})
              if (response.data.admin === true) {
                this.$store.commit('setAdminStatus', {state: true})
                this.$router.push('/admin')
                return
              }
              this.$router.push('/tasks');
            }
          })
          .catch(() => this.error.main = 'Login failed')
    }
  },
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