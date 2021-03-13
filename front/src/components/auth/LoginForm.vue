<template>
  <div class="form-box">
    <form @submit.prevent="login">
      <div class="form-control">
        <label for="email">E-mail:</label>
        <input type="email" name="email" id="email" v-model="loginData.email"/>
      </div>
      <div class="form-control">
        <label for="password">Password:</label>
        <input type="password" name="password" id="password" v-model="loginData.password"/>
      </div>
      <div class="form-actions">
        <button>Login</button>
      </div>
    </form>
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

          .then(response => console.log(response.data))
    }
  }
}
</script>

<style scoped>
.form-box {
  width: 500px;
  margin: 0 auto;
}

.form-control {
  display: flex;
  justify-content: center;
}

label {
  width: 100%;
}

input {
  width: 100%;
}
</style>